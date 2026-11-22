import * as THREE from 'three';
import { TweenManager } from '../core/TweenManager.js';

const material = (color, options = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.78, ...options });

function mesh(geometry, meshMaterial, parent, position, scale) {
  const object = new THREE.Mesh(geometry, meshMaterial);
  if (position) object.position.set(...position);
  if (scale) object.scale.set(...scale);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}

function createTom() {
  const group = new THREE.Group();
  group.userData.elementId = 'tom';
  const fur = material(0x777d82);
  const furDark = material(0x565d63);
  const white = material(0xf4f0e9);
  const pink = material(0xe9939b);
  const red = material(0xd95f58);
  const green = material(0x6ea86c, { emissive: 0x315f37, emissiveIntensity: 0.12 });
  const dark = material(0x243832);
  const sphere = new THREE.SphereGeometry(1, 32, 24);

  const body = mesh(sphere, red, group, [0, 1.03, 0], [0.56, 0.72, 0.4]);
  body.userData.baseScale = body.scale.clone();
  mesh(sphere, white, group, [0, 0.92, 0.36], [0.31, 0.42, 0.07]);
  const collar = mesh(new THREE.TorusGeometry(0.25, 0.045, 10, 36), white, group, [0, 1.6, 0.27]);
  collar.scale.y = 0.55;
  [-0.12, 0.12].forEach((x) => mesh(sphere, white, group, [x, 1.25, 0.4], [0.035, 0.035, 0.018]));

  const head = new THREE.Group();
  head.position.set(0, 2.18, 0.02);
  group.add(head);
  mesh(sphere, fur, head, [0, 0.12, 0], [0.76, 0.67, 0.61]);
  mesh(sphere, furDark, head, [0, 0.51, 0.36], [0.25, 0.11, 0.08]);

  [-1, 1].forEach((side) => {
    const ear = mesh(new THREE.ConeGeometry(0.34, 0.75, 3), fur, head, [side * 0.48, 0.66, -0.02]);
    ear.rotation.z = side * -0.16;
    ear.rotation.y = side * 0.08;
    const inner = mesh(new THREE.ConeGeometry(0.2, 0.48, 3), pink, head, [side * 0.48, 0.65, 0.15]);
    inner.rotation.z = side * -0.16;
  });

  const eyes = [];
  [-1, 1].forEach((side) => {
    const eye = new THREE.Group();
    eye.position.set(side * 0.27, 0.23, 0.54);
    head.add(eye);
    eyes.push(eye);
    mesh(sphere, white, eye, [0, 0, 0], [0.22, 0.27, 0.09]);
    mesh(sphere, green, eye, [0, 0, 0.08], [0.13, 0.18, 0.045]);
    mesh(sphere, dark, eye, [0, 0, 0.12], [0.055, 0.13, 0.025]);
    mesh(sphere, white, eye, [side * -0.02 - 0.035, 0.08, 0.15], [0.036, 0.048, 0.018]);
    mesh(sphere, white, head, [side * 0.18, -0.11, 0.53], [0.29, 0.22, 0.13]);
  });
  eyes.forEach((eye) => { eye.userData.baseScale = eye.scale.clone(); });
  mesh(sphere, pink, head, [0, 0.02, 0.7], [0.13, 0.085, 0.065]);
  const mouth = mesh(sphere, dark, head, [0, -0.25, 0.62], [0.15, 0.025, 0.035]);
  mouth.userData.baseScale = mouth.scale.clone();
  mesh(sphere, white, head, [0, -0.29, 0.63], [0.09, 0.018, 0.02]);

  const whiskerPoints = [];
  [-1, 1].forEach((side) => {
    [-0.13, -0.04].forEach((y) => {
      whiskerPoints.push(new THREE.Vector3(side * 0.3, y, 0.64), new THREE.Vector3(side * 0.77, y + 0.06, 0.52));
    });
  });
  head.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(whiskerPoints), new THREE.LineBasicMaterial({ color: 0xe8e4dd, transparent: true, opacity: 0.8 })));

  const arms = [];
  [-1, 1].forEach((side) => {
    const arm = new THREE.Group();
    arm.position.set(side * 0.52, 1.48, 0.02);
    arm.userData.baseRotationZ = side * 0.09;
    arm.rotation.z = arm.userData.baseRotationZ;
    group.add(arm);
    mesh(new THREE.CapsuleGeometry(0.12, 0.55, 6, 14), fur, arm, [0, -0.38, 0], [1, 1, 1]);
    mesh(sphere, fur, arm, [0, -0.77, 0.05], [0.16, 0.18, 0.14]);
    mesh(sphere, pink, arm, [0, -0.79, 0.17], [0.075, 0.07, 0.025]);
    arms.push(arm);
  });

  const legs = [];
  [-1, 1].forEach((side) => {
    const leg = new THREE.Group();
    leg.position.set(side * 0.27, 0.58, 0);
    group.add(leg);
    mesh(new THREE.CapsuleGeometry(0.15, 0.42, 6, 14), furDark, leg, [0, -0.32, 0]);
    mesh(sphere, white, leg, [0, -0.61, 0.13], [0.23, 0.14, 0.34]);
    mesh(new THREE.TorusGeometry(0.15, 0.025, 7, 24), material(0x79a884), leg, [0, -0.55, 0.26]);
    legs.push(leg);
  });

  const tail = new THREE.Group();
  tail.position.set(0.38, 0.65, -0.22);
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.55, 0.1, 0),
    new THREE.Vector3(0.78, 0.55, 0.12), new THREE.Vector3(0.56, 0.87, 0.18),
  ]);
  mesh(new THREE.TubeGeometry(curve, 28, 0.095, 12, false), fur, tail);
  group.add(tail);

  return { group, body, head, eyes, mouth, arms, legs, tail };
}

export function createTomScene(container, { onElementClick = () => {} } = {}) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = new TweenManager({ reducedMotion });
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    container.innerHTML = '<div class="scene-fallback" role="button" tabindex="0" aria-label="Том"><span>🐱</span></div>';
    container.firstElementChild.addEventListener('click', () => onElementClick('tom'));
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
  renderer.domElement.setAttribute('aria-label', 'Том. Нажми на героя или мяч.');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe8e5f1);
  const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 60);
  camera.position.set(3.6, 2.8, 8);
  camera.lookAt(0, 1.35, 0);
  scene.add(new THREE.HemisphereLight(0xfff8ee, 0x9a9cb5, 2.2));
  const light = new THREE.DirectionalLight(0xffe8cf, 3.2);
  light.position.set(-3, 7, 5);
  light.castShadow = true;
  light.shadow.mapSize.set(1536, 1536);
  Object.assign(light.shadow.camera, { left: -5, right: 5, top: 6, bottom: -3, near: 0.5, far: 20 });
  scene.add(light);

  const floor = mesh(new THREE.PlaneGeometry(30, 30), material(0xd9cfbd), scene, [0, -0.05, 0]);
  floor.rotation.x = -Math.PI / 2;
  floor.castShadow = false;
  const wall = mesh(new THREE.PlaneGeometry(18, 9), material(0xe8e5f1), scene, [0, 3, -3]);
  wall.castShadow = false;
  const rug = mesh(new THREE.CircleGeometry(1, 64), material(0x9ebfc0), scene, [0, -0.035, 0.5], [2.1, 1.35, 1]);
  rug.rotation.x = -Math.PI / 2;
  rug.castShadow = false;
  mesh(new THREE.BoxGeometry(2.1, 0.16, 1.2), material(0xb2c8d2), scene, [-2.2, 0.08, -1.2]);
  mesh(new THREE.SphereGeometry(1, 24, 16), material(0xf0d5a6), scene, [-2.2, 0.3, -1.2], [0.85, 0.22, 0.45]);
  const sink = new THREE.Group();
  sink.position.set(2.1, 0, -1.1);
  scene.add(sink);
  mesh(new THREE.CylinderGeometry(0.45, 0.34, 0.28, 28), material(0xf1eee8), sink, [0, 1.05, 0]);
  mesh(new THREE.BoxGeometry(0.18, 1.0, 0.18), material(0xc9c6c1), sink, [0, 0.48, 0]);
  mesh(new THREE.TorusGeometry(0.19, 0.04, 8, 24, Math.PI), material(0x91a8ad), sink, [0, 1.36, 0]);

  const tom = createTom();
  scene.add(tom.group);

  const ball = new THREE.Group();
  ball.userData.elementId = 'ball';
  scene.add(ball);
  mesh(new THREE.SphereGeometry(0.25, 28, 20), material(0xe5a765), ball);
  const stripeMaterial = material(0xf6ead8);
  mesh(new THREE.TorusGeometry(0.245, 0.025, 8, 36), stripeMaterial, ball).rotation.x = Math.PI / 2;
  mesh(new THREE.TorusGeometry(0.245, 0.025, 8, 36), stripeMaterial, ball).rotation.y = Math.PI / 2;

  const toothbrush = new THREE.Group();
  scene.add(toothbrush);
  mesh(new THREE.CapsuleGeometry(0.035, 0.45, 5, 10), material(0x6fa9ba), toothbrush);
  mesh(new THREE.BoxGeometry(0.16, 0.1, 0.08), material(0xf5f1e9), toothbrush, [0, 0.3, 0]);
  toothbrush.rotation.z = Math.PI / 2;

  const bowl = new THREE.Group();
  scene.add(bowl);
  mesh(new THREE.CylinderGeometry(0.36, 0.25, 0.2, 28), material(0xd98272), bowl);
  mesh(new THREE.SphereGeometry(1, 20, 12), material(0x9b6a45), bowl, [0, 0.12, 0], [0.27, 0.07, 0.27]);

  const bubbles = new THREE.Group();
  scene.add(bubbles);
  const bubbleMaterial = material(0xd8f1f2, { transparent: true, opacity: 0.72 });
  [[-0.65, 1.8, 0.8], [0.65, 2.1, 0.7], [-0.4, 2.65, 0.65], [0.4, 2.85, 0.6]].forEach((position, index) => {
    const bubble = mesh(new THREE.SphereGeometry(0.12 + index * 0.02, 18, 12), bubbleMaterial, bubbles, position);
    bubble.userData.basePosition = bubble.position.clone();
  });

  const notes = new THREE.Group();
  scene.add(notes);
  const noteMaterial = material(0xd6a657, { emissive: 0xb98536, emissiveIntensity: 0.15 });
  [[-0.85, 2.25, 0.5], [0.85, 2.6, 0.4]].forEach((position) => {
    const note = new THREE.Group();
    note.position.set(...position);
    notes.add(note);
    mesh(new THREE.SphereGeometry(0.09, 16, 12), noteMaterial, note, [0, 0, 0], [1.2, 0.8, 0.5]);
    mesh(new THREE.BoxGeometry(0.035, 0.38, 0.035), noteMaterial, note, [0.08, 0.2, 0]);
    note.userData.basePosition = note.position.clone();
  });

  function restorePose() {
    tom.group.position.set(0, 0, 0);
    tom.group.rotation.set(0, 0, 0);
    tom.head.rotation.set(0, 0, 0);
    tom.arms.forEach((arm) => { arm.rotation.set(0, 0, arm.userData.baseRotationZ); });
    tom.legs.forEach((leg) => leg.rotation.set(0, 0, 0));
    tom.eyes.forEach((eye) => eye.scale.copy(eye.userData.baseScale));
    tom.mouth.scale.copy(tom.mouth.userData.baseScale);
    ball.position.set(1.1, 0.25, 0.65);
    ball.rotation.set(0, 0, 0);
    toothbrush.visible = false;
    bowl.visible = false;
    bowl.position.set(0.85, 0.12, 0.65);
    bubbles.visible = false;
    bubbles.children.forEach((bubble) => {
      bubble.position.copy(bubble.userData.basePosition);
      bubble.scale.setScalar(1);
    });
    notes.visible = false;
    notes.children.forEach((note) => note.position.copy(note.userData.basePosition));
  }

  function animateAction(duration, update, { show = [] } = {}) {
    show.forEach((prop) => { prop.visible = true; });
    return motion.tween({ duration, ease: (value) => value, update: (_, progress) => update(progress, Math.sin(progress * Math.PI)) })
      .then((result) => { restorePose(); return result; });
  }

  const actions = {
    walk: () => animateAction(1900, (progress, envelope) => {
      const step = Math.sin(progress * Math.PI * 4);
      tom.group.position.x = Math.sin(progress * Math.PI * 2) * 0.65;
      tom.legs[0].rotation.x = step * 0.48 * envelope;
      tom.legs[1].rotation.x = -step * 0.48 * envelope;
      tom.arms[0].rotation.x = -step * 0.38 * envelope;
      tom.arms[1].rotation.x = step * 0.38 * envelope;
    }),
    run: () => animateAction(1800, (progress, envelope) => {
      const step = Math.sin(progress * Math.PI * 8);
      tom.group.position.x = Math.sin(progress * Math.PI * 2) * 1.05;
      tom.group.position.y = Math.abs(step) * 0.08 * envelope;
      tom.legs[0].rotation.x = step * 0.75 * envelope;
      tom.legs[1].rotation.x = -step * 0.75 * envelope;
      tom.arms[0].rotation.x = -step * 0.65 * envelope;
      tom.arms[1].rotation.x = step * 0.65 * envelope;
    }),
    jump: () => animateAction(1500, (progress, envelope) => {
      tom.group.position.y = Math.sin(progress * Math.PI) * 0.85;
      tom.arms[0].rotation.z = tom.arms[0].userData.baseRotationZ - envelope * 1.9;
      tom.arms[1].rotation.z = tom.arms[1].userData.baseRotationZ + envelope * 1.9;
    }),
    hello: () => animateAction(2100, (progress, envelope) => {
      tom.arms[1].rotation.z = tom.arms[1].userData.baseRotationZ + envelope * (2.2 + Math.sin(progress * Math.PI * 6) * 0.18);
      tom.head.rotation.z = -envelope * 0.12;
    }),
    laugh: () => animateAction(1800, (progress, envelope) => {
      tom.group.position.y = Math.abs(Math.sin(progress * Math.PI * 4)) * 0.09 * envelope;
      tom.head.rotation.x = -0.14 * envelope;
      tom.mouth.scale.y = tom.mouth.userData.baseScale.y * (1 + envelope * 4);
    }),
    dance: () => animateAction(2300, (progress, envelope) => {
      const beat = Math.sin(progress * Math.PI * 4);
      tom.group.rotation.y = beat * 0.35 * envelope;
      tom.group.rotation.z = beat * 0.08 * envelope;
      tom.group.position.y = Math.abs(beat) * 0.12 * envelope;
      tom.arms[0].rotation.z = tom.arms[0].userData.baseRotationZ - beat * 1.15 * envelope;
      tom.arms[1].rotation.z = tom.arms[1].userData.baseRotationZ - beat * 1.15 * envelope;
    }),
    'brush-teeth': () => animateAction(2400, (progress, envelope) => {
      tom.arms[1].rotation.z = tom.arms[1].userData.baseRotationZ + envelope * 2.0;
      toothbrush.position.set(Math.sin(progress * Math.PI * 8) * 0.09 * envelope, 2.08, 0.82);
      tom.mouth.scale.y = tom.mouth.userData.baseScale.y * (1 + envelope * 2);
    }, { show: [toothbrush] }),
    wash: () => animateAction(2200, (progress, envelope) => {
      const scrub = Math.sin(progress * Math.PI * 6);
      tom.arms[0].rotation.z = tom.arms[0].userData.baseRotationZ - envelope * (1.2 + scrub * 0.2);
      tom.arms[1].rotation.z = tom.arms[1].userData.baseRotationZ + envelope * (1.2 - scrub * 0.2);
      bubbles.children.forEach((bubble, index) => {
        bubble.position.y = bubble.userData.basePosition.y + progress * (0.25 + index * 0.08);
        bubble.scale.setScalar(0.5 + envelope * 0.7);
      });
    }, { show: [bubbles] }),
    eat: () => animateAction(2100, (progress, envelope) => {
      tom.group.rotation.x = envelope * 0.09;
      tom.head.rotation.x = envelope * (0.25 + Math.abs(Math.sin(progress * Math.PI * 4)) * 0.15);
      tom.arms[1].rotation.z = tom.arms[1].userData.baseRotationZ + envelope * 0.8;
    }, { show: [bowl] }),
    sleep: () => animateAction(2400, (progress, envelope) => {
      tom.group.position.y = -0.25 * envelope;
      tom.group.rotation.z = -0.18 * envelope;
      tom.head.rotation.z = -0.2 * envelope;
      tom.eyes.forEach((eye) => { eye.scale.y = eye.userData.baseScale.y * (1 - envelope * 0.93); });
    }),
    ball: () => animateAction(2000, (progress, envelope) => {
      tom.legs[1].rotation.x = -envelope * 1.05;
      ball.position.x = 1.1 + Math.sin(progress * Math.PI) * 0.95;
      ball.position.y = 0.25 + Math.abs(Math.sin(progress * Math.PI * 2)) * 0.32 * envelope;
      ball.rotation.z = -progress * 7;
    }),
    sing: () => animateAction(2300, (progress, envelope) => {
      const note = Math.sin(progress * Math.PI * 6);
      tom.mouth.scale.y = tom.mouth.userData.baseScale.y * (1 + envelope * (3 + note));
      tom.arms[0].rotation.z = tom.arms[0].userData.baseRotationZ - envelope * 1.25;
      tom.arms[1].rotation.z = tom.arms[1].userData.baseRotationZ + envelope * 1.25;
      tom.head.rotation.z = note * 0.09 * envelope;
      notes.children.forEach((item, index) => { item.position.y = item.userData.basePosition.y + progress * (0.35 + index * 0.15); });
    }, { show: [notes] }),
  };

  async function perform(action) {
    const run = actions[action];
    if (!run) return true;
    return run();
  }

  function cancel() {
    motion.cancel();
    restorePose();
  }

  function reset() {
    cancel();
  }

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  renderer.domElement.addEventListener('pointerdown', (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects([tom.group, ball], true);
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
  renderer.domElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onElementClick('tom');
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      onElementClick('ball');
    }
  });

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    const aspect = width / height;
    const frustum = aspect < 0.75 ? 5.8 : 5.2;
    camera.left = (-frustum * aspect) / 2;
    camera.right = (frustum * aspect) / 2;
    camera.top = frustum / 2 + 0.2;
    camera.bottom = -frustum / 2 + 0.2;
    camera.updateProjectionMatrix();
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
      tom.tail.rotation.y = reducedMotion ? 0 : Math.sin(time * 2.1) * 0.22;
      tom.body.scale.y = tom.body.userData.baseScale.y * (1 + Math.sin(time * 1.8) * 0.008);
      if (!motion.items.size && !reducedMotion) {
        const blink = Math.max(0, 1 - Math.abs((time % 4.2) - 0.12) / 0.12);
        tom.eyes.forEach((eye) => { eye.scale.y = eye.userData.baseScale.y * (1 - blink * 0.9); });
      }
    }
    renderer.render(scene, camera);
  }

  restorePose();
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
