import * as THREE from 'three';
import { TweenManager } from '../core/TweenManager.js';
import {
  createAppleProp,
  createBallProp,
  createBookProp,
  createCarProp,
  createDadActor,
  createDrinkProp,
  createLampProp,
  createMomActor,
  createRemoteProp,
  createTvProp,
  matchObjectForWord,
  material,
  mesh,
} from '../props/objectLibrary.js';

function detectStoryObjects(story) {
  const words = story?.lines?.flatMap((line) => line.words) || [];
  const ids = new Set();
  for (const item of words) {
    const matched = matchObjectForWord(item.word);
    if (matched) ids.add(matched);
  }
  return ids;
}

export function createSmartScene(container, { onElementClick = () => {}, story = null } = {}) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = new TweenManager({ reducedMotion });

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    container.innerHTML = '<div class="scene-fallback" role="button" tabindex="0" aria-label="Сцена"><span>🏠</span></div>';
    container.firstElementChild.addEventListener('click', () => onElementClick('scene'));
    return { async perform() { return true; }, cancel() {}, reset() {}, destroy() {} };
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'button');
  renderer.domElement.setAttribute('aria-label', story?.title || 'Интерактивная 3D-сцена');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf3ede2);
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
  const defaultCameraPos = new THREE.Vector3(0.05, 2.25, 8.2);
  const defaultLookAt = new THREE.Vector3(0, 1.38, 0);
  const currentLookAt = defaultLookAt.clone();
  let viewportAspect = 1;

  // Warm cozy living-room lighting
  scene.add(new THREE.HemisphereLight(0xfffaf2, 0xcabfae, 2.3));
  const keyLight = new THREE.DirectionalLight(0xfff1dc, 2.4);
  keyLight.position.set(3, 7, 6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1536, 1536);
  Object.assign(keyLight.shadow.camera, { left: -6, right: 6, top: 6, bottom: -3, near: 0.5, far: 20 });
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xdceeff, 0.85);
  fillLight.position.set(-4, 3, 4);
  scene.add(fillLight);

  // Cozy room backdrop
  const floor = mesh(new THREE.PlaneGeometry(30, 30), material(0xe3d5c0, { roughness: 0.92 }), scene, [0, -0.02, 0]);
  floor.rotation.x = -Math.PI / 2;
  floor.castShadow = false;
  const wall = mesh(new THREE.PlaneGeometry(24, 12), material(0xf3ede2, { roughness: 0.95 }), scene, [0, 4, -3.2]);
  wall.castShadow = false;
  const rug = mesh(new THREE.CircleGeometry(1, 64), material(0xadc9c3, { roughness: 0.92 }), scene, [0, 0.005, 0.35], [2.4, 1.35, 1]);
  rug.rotation.x = -Math.PI / 2;
  rug.castShadow = false;

  // Determine which 3D actors & props belong to this story
  const storyObjects = detectStoryObjects(story);
  const hasDad = storyObjects.has('dad');
  const hasMom = storyObjects.has('mom');
  const hasTv = storyObjects.has('tv') || storyObjects.has('turn-on') || storyObjects.has('turn-off');
  const hasLight = storyObjects.has('light');
  const hasCup = storyObjects.has('cup');
  const hasBall = storyObjects.has('ball');
  const hasApple = storyObjects.has('apple');
  const hasBook = storyObjects.has('book');
  const hasCar = storyObjects.has('car');

  // Primary human actor (Dad or Mom; default Dad if none explicitly matched)
  const dad = hasDad || (!hasMom && hasTv) ? createDadActor() : null;
  const mom = hasMom ? createMomActor() : null;
  const mainActor = dad || mom || createDadActor();
  if (dad) {
    dad.group.position.set(hasTv || hasLight || hasCup || hasBall || hasApple || hasBook || hasCar ? -1.05 : 0, 0, 0.25);
    scene.add(dad.group);
  }
  if (mom) {
    mom.group.position.set(dad ? -2.1 : (hasTv || hasCup || hasBall || hasApple || hasBook || hasCar ? -1.05 : 0), 0, 0.25);
    scene.add(mom.group);
  }
  if (!dad && !mom) {
    mainActor.group.position.set(-1.05, 0, 0.25);
    scene.add(mainActor.group);
  }

  // Interactive 3D props composed dynamically from the library
  const tv = hasTv ? createTvProp() : null;
  if (tv) {
    tv.group.position.set(0.95, 0, -0.35);
    tv.group.rotation.y = -0.18;
    scene.add(tv.group);
  }

  const remote = hasTv ? createRemoteProp() : null;
  if (remote) {
    remote.group.visible = false;
    scene.add(remote.group);
  }

  const lamp = hasLight ? createLampProp() : null;
  if (lamp) {
    lamp.group.position.set(hasTv ? 2.45 : 1.05, 0, -0.6);
    scene.add(lamp.group);
  }

  const tableProps = [];
  const registerProp = (prop, id) => {
    tableProps.push({ prop, id });
    scene.add(prop.group);
  };
  if (hasCup) registerProp(createDrinkProp(), 'cup');
  if (hasBall) registerProp(createBallProp(), 'ball');
  if (hasApple) registerProp(createAppleProp(), 'apple');
  if (hasBook) registerProp(createBookProp(), 'book');
  if (hasCar) registerProp(createCarProp(), 'car');

  tableProps.forEach(({ prop }, index) => {
    prop.group.position.set(0.85 + index * 0.72, 0, 0.75);
    prop.group.userData.baseY = 0;
  });

  const propById = Object.fromEntries(tableProps.map(({ prop, id }) => [id, prop]));
  let tvPowered = false;

  function setCameraFrame(envelope, targetPos, targetLook) {
    const distanceBoost = viewportAspect < 0.72 ? 1.18 : 1;
    const basePos = defaultCameraPos.clone().setZ(defaultCameraPos.z * distanceBoost);
    const goalPos = new THREE.Vector3(...targetPos);
    goalPos.z *= viewportAspect < 0.72 ? 1.14 : 1;
    camera.position.lerpVectors(basePos, goalPos, envelope);
    currentLookAt.lerpVectors(defaultLookAt, new THREE.Vector3(...targetLook), envelope);
    camera.lookAt(currentLookAt);
  }

  function restorePose({ keepTvState = true } = {}) {
    setCameraFrame(0, [defaultCameraPos.x, defaultCameraPos.y, defaultCameraPos.z], [defaultLookAt.x, defaultLookAt.y, defaultLookAt.z]);
    [dad, mom, mainActor].filter(Boolean).forEach((actor) => {
      actor.group.position.y = 0;
      actor.head.rotation.set(0, 0, 0);
      actor.arms.forEach((arm) => {
        arm.rotation.set(0, 0, arm.userData.baseRotationZ);
      });
    });
    if (remote) {
      remote.group.visible = false;
      remote.waves.visible = false;
    }
    if (tv && !keepTvState) {
      tvPowered = false;
      tv.setPower(false);
    }
    tableProps.forEach(({ prop }) => {
      prop.group.position.y = prop.group.userData.baseY || 0;
      prop.group.rotation.set(0, 0, 0);
    });
  }

  function animateAction(duration, update, { keepTvState = true } = {}) {
    return motion.tween({
      duration,
      ease: (value) => value,
      update: (_, progress) => update(progress, Math.sin(progress * Math.PI)),
    }).then((result) => {
      if (result) restorePose({ keepTvState });
      return result;
    });
  }

  function animateActorGreeting(actor) {
    const x = actor.group.position.x;
    return animateAction(1800, (progress, envelope) => {
      setCameraFrame(envelope, [x + 0.15, 2.4, 3.7], [x, 2.1, 0.25]);
      actor.arms[1].rotation.z = actor.arms[1].userData.baseRotationZ + envelope * (2.25 + Math.sin(progress * Math.PI * 6) * 0.22);
      actor.head.rotation.z = -0.1 * envelope;
      actor.head.rotation.y = 0.12 * envelope;
    });
  }

  function animateTurnOn(turnOn = true) {
    const actor = dad || mom || mainActor;
    if (remote) {
      remote.group.visible = true;
      remote.waves.visible = true;
    }
    let switched = false;
    return animateAction(2100, (progress, envelope) => {
      // Camera frames actor + remote + TV together cleanly
      setCameraFrame(envelope, [0.0, 2.05, 6.2], [0.05, 1.55, 0]);
      // Actor turns slightly toward TV and raises arm holding remote
      actor.head.rotation.y = 0.28 * envelope;
      actor.arms[1].rotation.z = actor.arms[1].userData.baseRotationZ + 1.35 * envelope;
      actor.arms[1].rotation.x = -0.45 * envelope;
      if (remote) {
        remote.group.position.set(actor.group.position.x + 0.92, 1.65 + 0.06 * envelope, 0.42);
        remote.group.rotation.set(0.15, -1.25, 0);
        remote.waves.visible = progress > 0.25 && progress < 0.78;
        remote.waves.scale.setScalar(0.75 + Math.sin(progress * Math.PI * 6) * 0.25);
        remote.waveMat.opacity = Math.max(0, Math.sin(progress * Math.PI));
      }
      if (!switched && progress > 0.45) {
        switched = true;
        if (tv) {
          tvPowered = turnOn;
          tv.setPower(turnOn);
        }
        if (lamp) lamp.setLit(turnOn);
      }
    });
  }

  function animateTvFocus() {
    if (!tv) return animateActorGreeting(mainActor);
    tvPowered = true;
    tv.setPower(true);
    return animateAction(2100, (progress, envelope) => {
      setCameraFrame(envelope, [1.05, 1.72, 3.65], [0.95, 1.55, -0.3]);
      tv.star.rotation.z = progress * Math.PI * 2;
      tv.star.position.y = -0.02 + Math.sin(progress * Math.PI * 4) * 0.08;
      tv.cloud.position.x = 0.26 + Math.sin(progress * Math.PI * 2) * 0.14;
      tv.sun.scale.setScalar(0.19 * (1 + Math.sin(progress * Math.PI * 4) * 0.08));
    });
  }

  function animatePropFocus(prop) {
    const pos = prop.group.position;
    return animateAction(1700, (progress, envelope) => {
      setCameraFrame(envelope, [pos.x, 1.25, 3.1], [pos.x, 0.4, pos.z]);
      prop.group.position.y = Math.abs(Math.sin(progress * Math.PI * 3)) * 0.28 * envelope;
      prop.group.rotation.y = progress * Math.PI * 2;
    });
  }

  async function perform(action, { word } = {}) {
    const matched = matchObjectForWord(word?.word) || action;
    if (matched === 'dad' && dad) return animateActorGreeting(dad);
    if (matched === 'mom' && mom) return animateActorGreeting(mom);
    if (matched === 'turn-on') return animateTurnOn(true);
    if (matched === 'turn-off') return animateTurnOn(false);
    if (matched === 'tv') return animateTvFocus();
    if (matched === 'light' && lamp) {
      lamp.setLit(true);
      return animatePropFocus(lamp);
    }
    if (propById[matched]) return animatePropFocus(propById[matched]);
    return animateActorGreeting(mainActor);
  }

  function cancel() {
    motion.cancel();
    restorePose({ keepTvState: true });
  }

  function reset() {
    motion.cancel();
    restorePose({ keepTvState: false });
  }

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const clickable = [dad?.group, mom?.group, mainActor.group, tv?.group, lamp?.group, ...tableProps.map((t) => t.prop.group)].filter(Boolean);
  renderer.domElement.addEventListener('pointerdown', (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickable, true);
    for (const hit of hits) {
      let current = hit.object;
      while (current) {
        if (current.userData.elementId) {
          onElementClick(current.userData.elementId);
          return;
        }
        current = current.parent;
      }
    }
  });

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    viewportAspect = width / height;
    camera.aspect = viewportAspect;
    camera.fov = viewportAspect < 0.72 ? 40 : 35;
    camera.updateProjectionMatrix();
    if (!motion.items.size) {
      setCameraFrame(0, [defaultCameraPos.x, defaultCameraPos.y, defaultCameraPos.z], [defaultLookAt.x, defaultLookAt.y, defaultLookAt.z]);
    }
    renderer.setSize(width, height, false);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let destroyed = false;
  let previousTime = performance.now();
  function animate(now) {
    if (destroyed) return;
    requestAnimationFrame(animate);
    const delta = Math.min((now - previousTime) / 1000, 0.25);
    previousTime = now;
    if (!document.hidden) {
      motion.tick(delta);
      const time = now / 1000;
      if (tv && tvPowered && !reducedMotion) {
        tv.cloud.position.x = 0.28 + Math.sin(time * 0.9) * 0.1;
        tv.star.position.y = -0.02 + Math.sin(time * 2.4) * 0.05;
      }
    }
    renderer.render(scene, camera);
  }

  restorePose({ keepTvState: false });
  requestAnimationFrame(animate);
  return {
    perform,
    cancel,
    reset,
    destroy() {
      destroyed = true;
      motion.cancel();
      observer.disconnect();
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((item) => item.dispose());
        else object.material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
