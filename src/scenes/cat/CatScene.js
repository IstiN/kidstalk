import * as THREE from 'three';
import { TweenManager } from '../core/TweenManager.js';

const damp = THREE.MathUtils.damp;
const material = (color, options = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.85, ...options });

function makeMesh(geometry, meshMaterial, parent, position, scale) {
  const mesh = new THREE.Mesh(geometry, meshMaterial);
  if (position) mesh.position.set(...position);
  if (scale) mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function createCat({ color, accent, elementId }) {
  const group = new THREE.Group();
  group.userData.elementId = elementId;
  const fur = material(color);
  const furLight = material(new THREE.Color(color).lerp(new THREE.Color(0xfff2df), 0.42));
  const stripe = material(accent);
  const pink = material(0xe8a7a0);
  const dark = material(0x34443f);
  const eyeGreen = material(0x7f9c75);
  const sphere = new THREE.SphereGeometry(1, 28, 20);

  const body = makeMesh(sphere, fur, group, [0, 0.74, 0], [0.56, 0.72, 0.48]);
  body.userData.baseScaleY = body.scale.y;
  makeMesh(sphere, furLight, group, [0, 0.67, 0.43], [0.36, 0.47, 0.08]);

  const head = new THREE.Group();
  head.position.set(0, 1.38, 0.03);
  group.add(head);
  makeMesh(sphere, fur, head, [0, 0.14, 0], [0.52, 0.48, 0.45]);
  makeMesh(sphere, furLight, head, [0, -0.02, 0.38], [0.28, 0.19, 0.1]);

  const ears = [];
  [-1, 1].forEach((side) => {
    const ear = makeMesh(new THREE.ConeGeometry(0.23, 0.5, 4), fur, head, [side * 0.31, 0.59, -0.02]);
    ear.rotation.y = Math.PI / 4;
    ear.rotation.z = side * -0.08;
    ear.userData.baseRotation = ear.rotation.z;
    ears.push(ear);
    const inner = makeMesh(new THREE.ConeGeometry(0.12, 0.3, 4), pink, head, [side * 0.31, 0.59, 0.1]);
    inner.rotation.y = Math.PI / 4;
    inner.rotation.z = side * -0.08;
    makeMesh(sphere, eyeGreen, head, [side * 0.18, 0.2, 0.42], [0.072, 0.084, 0.035]);
    makeMesh(sphere, dark, head, [side * 0.18, 0.2, 0.456], [0.026, 0.06, 0.018]);
    makeMesh(sphere, furLight, head, [side * 0.36, 0.02, 0.36], [0.13, 0.1, 0.06]);
  });
  makeMesh(sphere, pink, head, [0, 0.04, 0.49], [0.065, 0.047, 0.035]);
  [-0.09, 0, 0.09].forEach((x) => {
    const mark = makeMesh(new THREE.BoxGeometry(0.035, 0.14, 0.025), stripe, head, [x, 0.43, 0.4]);
    mark.rotation.z = x * 1.8;
  });

  const mouthPoints = [
    new THREE.Vector3(0, 0, 0.49), new THREE.Vector3(0, -0.06, 0.49),
    new THREE.Vector3(0, -0.06, 0.49), new THREE.Vector3(-0.08, -0.1, 0.47),
    new THREE.Vector3(0, -0.06, 0.49), new THREE.Vector3(0.08, -0.1, 0.47),
  ];
  head.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(mouthPoints), new THREE.LineBasicMaterial({ color: 0x66554e })));
  const whiskerPoints = [];
  [-1, 1].forEach((side) => {
    [-0.06, 0.04].forEach((y) => {
      whiskerPoints.push(new THREE.Vector3(side * 0.22, y, 0.43), new THREE.Vector3(side * 0.58, y + 0.04, 0.42));
    });
  });
  head.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(whiskerPoints), new THREE.LineBasicMaterial({ color: 0x7c7167 })));
  if (elementId === 'mom') {
    const bowMaterial = material(0xc98388);
    makeMesh(sphere, bowMaterial, head, [-0.48, 0.48, 0.25], [0.14, 0.09, 0.06]);
    makeMesh(sphere, bowMaterial, head, [-0.25, 0.48, 0.25], [0.14, 0.09, 0.06]);
    makeMesh(sphere, bowMaterial, head, [-0.365, 0.48, 0.29], [0.065, 0.065, 0.05]);
  }

  const pawMaterial = fur.clone();
  const pawGeometry = new THREE.CapsuleGeometry(0.12, 0.6, 5, 12);
  let leftPaw;
  let rightPaw;
  [-1, 1].forEach((side) => {
    const shoulder = new THREE.Vector3(side * 0.28, 0.92, 0.28);
    const pawTip = new THREE.Vector3(side * 0.18, 0.16, 0.62);
    const paw = makeMesh(pawGeometry, side < 0 ? pawMaterial : pawMaterial.clone(), group);
    paw.position.copy(shoulder).add(pawTip).multiplyScalar(0.5);
    paw.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), shoulder.clone().sub(pawTip).normalize());
    paw.userData.basePosition = paw.position.clone();
    paw.userData.baseScale = paw.scale.clone();
    paw.userData.baseRotation = paw.rotation.z;
    if (side < 0) leftPaw = paw;
    else rightPaw = paw;
  });
  rightPaw.userData.elementId = 'paw';
  makeMesh(sphere, fur, group, [-0.35, 0.1, 0.34], [0.31, 0.18, 0.39]);
  makeMesh(sphere, fur, group, [0.35, 0.1, 0.34], [0.31, 0.18, 0.39]);

  const tail = new THREE.Group();
  tail.position.set(0.4, 0.38, -0.25);
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.46, 0.1, 0.05),
    new THREE.Vector3(0.53, 0.54, 0.15),
    new THREE.Vector3(0.32, 0.75, 0.27),
  ]);
  makeMesh(new THREE.TubeGeometry(tailCurve, 28, 0.085, 10, false), fur, tail);
  group.add(tail);

  return { group, body, head, ears, leftPaw, rightPaw, tail };
}

export function createCatScene(container, { onElementClick = () => {} } = {}) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = new TweenManager({ reducedMotion });
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    container.innerHTML = '<div class="scene-fallback" role="button" tabindex="0" aria-label="Котик. Нажмите, чтобы произнести слово"><span>🐱</span><small>Нажми на котика</small></div>';
    const fallback = container.firstElementChild;
    fallback.addEventListener('click', () => onElementClick('cat'));
    fallback.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') onElementClick('cat');
    });
    return { async perform() { return true; }, cancel() {}, reset() {}, destroy() {} };
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'button');
  renderer.domElement.setAttribute('aria-label', 'Комната котика. Стрелки выбирают предмет, Enter произносит его название.');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf3eee4);
  scene.fog = new THREE.Fog(0xf3eee4, 10, 23);
  const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 60);
  camera.position.set(4.1, 2.75, 7.7);
  camera.lookAt(0, 0.7, 0);

  scene.add(new THREE.HemisphereLight(0xfff8eb, 0xb2bba6, 2.15));
  const sunlight = new THREE.DirectionalLight(0xffefd3, 3.1);
  sunlight.position.set(-3, 7, 5);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(1536, 1536);
  Object.assign(sunlight.shadow.camera, { left: -6, right: 6, top: 6, bottom: -4, near: 0.5, far: 20 });
  sunlight.shadow.bias = -0.0005;
  scene.add(sunlight);

  const floor = makeMesh(new THREE.PlaneGeometry(30, 30), material(0xddd5c1), scene, [0, -0.78, 0]);
  floor.rotation.x = -Math.PI / 2;
  floor.castShadow = false;
  const wall = makeMesh(new THREE.PlaneGeometry(15, 8), material(0xf1e8da), scene, [0, 2.4, -3]);
  wall.castShadow = false;
  makeMesh(new THREE.BoxGeometry(13, 0.16, 0.12), material(0xd8c9b5), scene, [0, -0.66, -2.92]);
  const rug = makeMesh(new THREE.CircleGeometry(1, 64), material(0xd8b7a5), scene, [-0.35, -0.765, 0.65], [2.45, 1.4, 1]);
  rug.rotation.x = -Math.PI / 2;
  rug.castShadow = false;

  const windowGroup = new THREE.Group();
  windowGroup.userData.elementId = 'window';
  windowGroup.position.set(-2.15, 2.05, -2.85);
  scene.add(windowGroup);
  const frameMaterial = material(0xf8f1e5);
  makeMesh(new THREE.BoxGeometry(1.75, 1.5, 0.08), material(0xaecfd7, { emissive: 0x5c8b9b, emissiveIntensity: 0.08 }), windowGroup);
  makeMesh(new THREE.SphereGeometry(1, 20, 14), material(0xa6bf98), windowGroup, [-0.48, -0.52, 0.08], [0.72, 0.32, 0.06]);
  makeMesh(new THREE.SphereGeometry(1, 20, 14), material(0x91b18b), windowGroup, [0.5, -0.52, 0.08], [0.7, 0.28, 0.06]);
  const sun = makeMesh(new THREE.SphereGeometry(1, 24, 16), material(0xf1ca70, { emissive: 0xe6ae43, emissiveIntensity: 0.28 }), windowGroup, [0.42, 0.35, 0.13], [0.23, 0.23, 0.08]);
  [-0.91, 0.91].forEach((x) => makeMesh(new THREE.BoxGeometry(0.12, 1.7, 0.15), frameMaterial, windowGroup, [x, 0, 0.14]));
  [-0.8, 0.8].forEach((y) => makeMesh(new THREE.BoxGeometry(1.94, 0.12, 0.15), frameMaterial, windowGroup, [0, y, 0.14]));
  makeMesh(new THREE.BoxGeometry(0.08, 1.5, 0.12), frameMaterial, windowGroup, [0, 0, 0.14]);
  makeMesh(new THREE.BoxGeometry(1.75, 0.08, 0.12), frameMaterial, windowGroup, [0, 0, 0.14]);

  const chair = new THREE.Group();
  chair.userData.elementId = 'chair';
  chair.position.set(1.55, 0, -0.1);
  scene.add(chair);
  const wood = material(0xb98c60);
  const woodLight = material(0xcda87d);
  makeMesh(new THREE.BoxGeometry(1.25, 0.14, 1.05), woodLight, chair, [0, 0.1, 0]);
  [-1, 1].forEach((xSide) => {
    [-1, 1].forEach((zSide) => {
      makeMesh(new THREE.BoxGeometry(0.11, 0.82, 0.11), wood, chair, [xSide * 0.48, -0.35, zSide * 0.38]);
    });
    makeMesh(new THREE.BoxGeometry(0.11, 1.35, 0.11), wood, chair, [xSide * 0.48, 0.72, -0.43]);
  });
  [0.66, 1.08].forEach((y) => makeMesh(new THREE.BoxGeometry(1.08, 0.22, 0.1), woodLight, chair, [0, y, -0.43]));

  const ball = new THREE.Group();
  ball.userData.elementId = 'ball';
  ball.position.set(-0.1, -0.52, 0.55);
  scene.add(ball);
  makeMesh(new THREE.SphereGeometry(0.24, 28, 20), material(0xdb776c), ball);
  const ballStripe = material(0xf8e9d8);
  const stripeOne = makeMesh(new THREE.TorusGeometry(0.235, 0.025, 8, 40), ballStripe, ball);
  stripeOne.rotation.x = Math.PI / 2;
  const stripeTwo = makeMesh(new THREE.TorusGeometry(0.235, 0.025, 8, 40), ballStripe, ball);
  stripeTwo.rotation.y = Math.PI / 2;

  const cat = createCat({ color: 0xdca36e, accent: 0xa8734c, elementId: 'cat' });
  cat.group.position.set(-1.25, -0.76, 0.4);
  cat.group.userData.baseY = -0.76;
  scene.add(cat.group);
  const mom = createCat({ color: 0xbeb3a5, accent: 0x8f8176, elementId: 'mom' });
  mom.group.position.set(3.95, -0.76, 0.45);
  mom.group.scale.setScalar(1.36);
  mom.tail.scale.x = -1;
  mom.tail.position.x *= -1;
  mom.group.userData.baseY = -0.76;
  mom.group.visible = false;
  mom.rightPaw.userData.elementId = 'mom';
  scene.add(mom.group);

  const focusMaterial = new THREE.MeshBasicMaterial({ color: 0xe6b963, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
  const focusRing = new THREE.Mesh(new THREE.RingGeometry(0.48, 0.54, 48), focusMaterial);
  focusRing.rotation.x = -Math.PI / 2;
  focusRing.position.y = -0.75;
  scene.add(focusRing);
  const sparkleMaterial = new THREE.MeshBasicMaterial({ color: 0xf1c66e, transparent: true, opacity: 0, depthWrite: false });
  const sparkles = new THREE.Group();
  [[-0.35, 0.48, 0], [0.32, 0.57, 0.04], [0, 0.72, 0]].forEach((position) => {
    makeMesh(new THREE.OctahedronGeometry(0.07), sparkleMaterial, sparkles, position);
  });
  ball.add(sparkles);

  let sadTarget = 0;
  let sadAmount = 0;
  let momTailAction = 0;
  let destroyed = false;
  let previousTime = performance.now();
  const completed = async (promises) => (await Promise.all(promises)).every(Boolean);

  function pulseFocus({ x = 0, z = 0.4, scale = 1, duration = 1200 } = {}) {
    focusRing.position.set(x, -0.75, z);
    return motion.tween({
      duration,
      ease: (value) => value,
      update: (_, progress) => {
        const size = scale * (0.75 + progress * 0.4);
        focusRing.scale.set(size, size, size);
        focusMaterial.opacity = Math.sin(progress * Math.PI) * 0.85;
      },
    });
  }

  function hopActor(actor, duration = 900) {
    const baseY = actor.group.userData.baseY;
    return motion.tween({
      duration,
      ease: (value) => value,
      update: (_, progress) => {
        actor.group.position.y = baseY + Math.sin(progress * Math.PI) * 0.28;
      },
    }).then((result) => {
      actor.group.position.y = baseY;
      return result;
    });
  }

  function bounceBall(duration = 1000) {
    const baseY = -0.52;
    const startRotation = ball.rotation.z;
    return motion.tween({
      duration,
      ease: (value) => value,
      update: (_, progress) => {
        ball.position.y = baseY + Math.abs(Math.sin(progress * Math.PI * 2)) * 0.24;
        ball.rotation.z = startRotation - progress * 1.5;
      },
    }).then((result) => {
      ball.position.y = baseY;
      return result;
    });
  }

  function wavePaw(actor, duration = 1000) {
    const paw = actor.rightPaw;
    const base = paw.userData.baseRotation;
    return motion.tween({
      duration,
      ease: (value) => value,
      update: (_, progress) => {
        paw.rotation.z = base + Math.sin(progress * Math.PI * 4) * 0.45 * Math.sin(progress * Math.PI);
      },
    });
  }

  async function focusCat() {
    sadTarget = 0;
    return completed([hopActor(cat, 1000), wavePaw(cat, 1100), pulseFocus({ x: cat.group.position.x, z: 0.4, duration: 1150 })]);
  }

  async function findBall() {
    sadTarget = 0;
    const startRotation = cat.head.rotation.y;
    return completed([
      motion.tween({ duration: 1300, update: (value) => { cat.head.rotation.y = THREE.MathUtils.lerp(startRotation, 0.58, value); } }),
      bounceBall(1300),
      motion.tween({
        duration: 1400,
        ease: (value) => value,
        update: (_, progress) => { sparkleMaterial.opacity = Math.sin(progress * Math.PI); },
      }),
    ]);
  }

  async function focusBall() {
    return completed([bounceBall(1200), pulseFocus({ x: ball.position.x, z: ball.position.z, scale: 0.65, duration: 1250 })]);
  }

  async function rollBall() {
    const ballStart = ball.position.clone();
    const catStartX = cat.group.position.x;
    const paw = cat.rightPaw;
    const pawBase = paw.userData.baseRotation;
    return motion.tween({
      duration: 1800,
      ease: (value) => value,
      update: (_, progress) => {
        ball.position.x = THREE.MathUtils.lerp(ballStart.x, 0.95, progress);
        ball.position.z = THREE.MathUtils.lerp(ballStart.z, 0.35, progress);
        ball.rotation.z = -progress * 7;
        cat.group.position.x = THREE.MathUtils.lerp(catStartX, -0.35, progress);
        cat.head.rotation.y = 0.55;
        paw.rotation.z = pawBase - Math.sin(progress * Math.PI * 2) * 0.35;
      },
    });
  }

  async function focusIt() {
    return completed([bounceBall(1050), pulseFocus({ x: ball.position.x, z: ball.position.z, scale: 0.6, duration: 1100 })]);
  }

  async function ballUnderChair() {
    const ballStart = ball.position.clone();
    const catStartX = cat.group.position.x;
    wood.emissive.set(0x76501f);
    woodLight.emissive.set(0x76501f);
    return motion.tween({
      duration: 1850,
      ease: (value) => value,
      update: (_, progress) => {
        ball.position.x = THREE.MathUtils.lerp(ballStart.x, 1.55, progress);
        ball.position.z = THREE.MathUtils.lerp(ballStart.z, -0.05, progress);
        ball.rotation.z -= 0.12;
        cat.group.position.x = THREE.MathUtils.lerp(catStartX, 0.15, progress);
        cat.head.rotation.y = 0.65;
        wood.emissiveIntensity = Math.sin(progress * Math.PI) * 0.16;
        woodLight.emissiveIntensity = Math.sin(progress * Math.PI) * 0.16;
      },
    });
  }

  async function showPaw() {
    const paw = cat.rightPaw;
    const base = paw.userData.basePosition;
    paw.material.emissive.set(0x8b542b);
    return completed([
      pulseFocus({ x: cat.group.position.x + 0.25, z: 0.55, scale: 0.55, duration: 1350 }),
      motion.tween({
        duration: 1350,
        ease: (value) => value,
        update: (_, progress) => {
          const lift = Math.sin(progress * Math.PI);
          paw.position.y = base.y + lift * 0.08;
          paw.position.z = base.z + lift * 0.06;
          paw.material.emissiveIntensity = lift * 0.2;
        },
      }),
    ]).then((result) => {
      paw.position.copy(base);
      paw.material.emissiveIntensity = 0;
      return result;
    });
  }

  async function reachBall() {
    const catStartX = cat.group.position.x;
    const paw = cat.rightPaw;
    const base = paw.userData.basePosition;
    const baseRotation = paw.userData.baseRotation;
    return motion.tween({
      duration: 1900,
      update: (value) => {
        cat.group.position.x = THREE.MathUtils.lerp(catStartX, 0.5, value);
        paw.position.x = THREE.MathUtils.lerp(base.x, base.x + 0.06, value);
        paw.position.y = THREE.MathUtils.lerp(base.y, base.y + 0.04, value);
        paw.position.z = THREE.MathUtils.lerp(base.z, base.z + 0.08, value);
        paw.rotation.z = THREE.MathUtils.lerp(baseRotation, baseRotation - 0.18, value);
        cat.head.rotation.y = 0.75;
        cat.head.rotation.x = THREE.MathUtils.lerp(0, 0.18, value);
      },
    });
  }

  async function cannotReach() {
    sadTarget = 1;
    const shaken = await motion.tween({
      duration: 900,
      ease: (value) => value,
      update: (_, progress) => { cat.head.rotation.y = Math.sin(progress * Math.PI * 4) * 0.2 * (1 - progress); },
    });
    if (!shaken) return false;
    const paw = cat.rightPaw;
    const base = paw.userData.basePosition;
    const baseRotation = paw.userData.baseRotation;
    return motion.tween({
      duration: 1150,
      update: (value) => {
        paw.position.x = THREE.MathUtils.lerp(base.x + 0.06, base.x, value);
        paw.position.y = THREE.MathUtils.lerp(base.y + 0.04, base.y, value);
        paw.position.z = THREE.MathUtils.lerp(base.z + 0.08, base.z, value);
        paw.rotation.z = THREE.MathUtils.lerp(baseRotation - 0.18, baseRotation, value);
        cat.head.rotation.x = THREE.MathUtils.lerp(0.18, 0, value);
      },
    });
  }

  async function enterMom() {
    mom.group.visible = true;
    mom.group.position.set(3.95, -0.76, 0.45);
    const catStartX = cat.group.position.x;
    sadTarget = 0.4;
    return motion.tween({
      duration: 2300,
      ease: (value) => value,
      update: (_, progress) => {
        mom.group.position.x = THREE.MathUtils.lerp(3.95, 2.85, progress);
        mom.group.position.y = -0.76 + Math.abs(Math.sin(progress * Math.PI * 8)) * 0.04;
        cat.group.position.x = THREE.MathUtils.lerp(catStartX, -0.95, progress);
        mom.head.rotation.y = THREE.MathUtils.lerp(0, -0.55, progress);
        cat.head.rotation.y = THREE.MathUtils.lerp(0, 0.45, progress);
        mom.leftPaw.rotation.z = Math.sin(progress * Math.PI * 8) * 0.25;
        mom.rightPaw.rotation.z = -Math.sin(progress * Math.PI * 8) * 0.25;
      },
    }).then((result) => {
      mom.group.position.y = -0.76;
      return result;
    });
  }

  async function helpCat() {
    sadTarget = 0;
    const ballStart = ball.position.clone();
    const momStartX = mom.group.position.x;
    const catStartX = cat.group.position.x;
    const tailStart = mom.tail.rotation.z;
    momTailAction = 1;
    const reached = await motion.tween({
      duration: 1800,
      ease: (value) => value,
      update: (_, progress) => {
        mom.group.position.x = THREE.MathUtils.lerp(momStartX, 2.75, progress);
        cat.group.position.x = THREE.MathUtils.lerp(catStartX, -1.15, progress);
        mom.tail.rotation.z = THREE.MathUtils.lerp(tailStart, -1.45, Math.min(progress * 1.35, 1));
        mom.head.rotation.x = THREE.MathUtils.lerp(0, 0.18, progress);
        mom.head.rotation.y = THREE.MathUtils.lerp(-0.55, 0.55, progress);
        cat.head.rotation.y = 0.45;
        const pullProgress = THREE.MathUtils.clamp((progress - 0.42) / 0.58, 0, 1);
        const pull = pullProgress * pullProgress * (3 - 2 * pullProgress);
        ball.position.x = THREE.MathUtils.lerp(ballStart.x, 0.62, pull);
        ball.position.z = THREE.MathUtils.lerp(ballStart.z, 1.05, pull);
        ball.rotation.z -= pull * 0.1;
      },
    });
    if (!reached) return false;
    return motion.tween({
      duration: 700,
      update: (value) => {
        mom.tail.rotation.z = THREE.MathUtils.lerp(-1.45, 0, value);
        mom.head.rotation.x = THREE.MathUtils.lerp(0.18, 0, value);
      },
    }).then((result) => {
      mom.tail.rotation.z = 0;
      momTailAction = 0;
      return result;
    });
  }

  async function celebrateCat() {
    sadTarget = 0;
    cat.head.rotation.y = 0;
    mom.head.rotation.y = -0.25;
    return completed([
      hopActor(cat, 1200),
      bounceBall(1300),
      wavePaw(cat, 1200),
      pulseFocus({ x: cat.group.position.x, z: 0.5, scale: 0.9, duration: 1400 }),
    ]);
  }

  async function focusWindow() {
    return motion.tween({
      duration: 1250,
      ease: (value) => value,
      update: (_, progress) => {
        const glow = Math.sin(progress * Math.PI);
        sun.scale.set(0.23 + glow * 0.1, 0.23 + glow * 0.1, 0.08);
        sunlight.intensity = 3.1 + glow * 1.4;
      },
    }).then((result) => {
      sun.scale.set(0.23, 0.23, 0.08);
      sunlight.intensity = 3.1;
      return result;
    });
  }

  const actions = {
    focusCat,
    findBall,
    focusBall,
    rollBall,
    focusIt,
    ballUnderChair,
    showPaw,
    reachBall,
    cannotReach,
    enterMom,
    helpCat,
    celebrateCat,
    focusWindow,
  };

  async function perform(action) {
    const run = actions[action];
    if (!run) return true;
    return run();
  }

  function cancel() {
    motion.cancel();
    focusMaterial.opacity = 0;
    sparkleMaterial.opacity = 0;
    cat.rightPaw.material.emissiveIntensity = 0;
    wood.emissiveIntensity = 0;
    woodLight.emissiveIntensity = 0;
    sun.scale.set(0.23, 0.23, 0.08);
    sunlight.intensity = 3.1;
  }

  function resetPaw(paw) {
    paw.position.copy(paw.userData.basePosition);
    paw.scale.copy(paw.userData.baseScale);
    paw.rotation.z = paw.userData.baseRotation;
    paw.material.emissiveIntensity = 0;
  }

  function reset(initialState = {}) {
    const { cat: catState = 'near-ball', ball: ballState = 'floor', mom: momState = 'away' } = initialState;
    motion.cancel();
    cancel();
    cat.group.visible = true;
    cat.group.position.set(catState === 'near-chair' ? 0.15 : -1.25, -0.76, 0.4);
    cat.group.rotation.set(0, 0, 0);
    cat.head.rotation.set(0, 0, 0);
    resetPaw(cat.leftPaw);
    resetPaw(cat.rightPaw);
    cat.tail.rotation.set(0, 0, 0);
    ball.position.set(...(ballState === 'under-chair' ? [1.55, -0.52, -0.05] : ballState === 'returned' ? [0.62, -0.52, 1.05] : [-0.1, -0.52, 0.55]));
    ball.rotation.set(0, 0, 0);
    mom.group.visible = momState === 'here';
    mom.group.position.set(momState === 'here' ? 2.85 : 3.95, -0.76, 0.45);
    mom.group.rotation.set(0, 0, 0);
    resetPaw(mom.leftPaw);
    resetPaw(mom.rightPaw);
    mom.tail.rotation.set(0, 0, 0);
    momTailAction = 0;
    sadTarget = ballState === 'under-chair' && momState === 'away' ? 0.65 : 0;
    sadAmount = sadTarget;
  }

  const interactiveRoots = [cat.group, mom.group, ball, chair, windowGroup];
  const keyboardElements = ['cat', 'ball', 'chair', 'paw', 'mom', 'window'];
  let keyboardIndex = 0;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function elementPressed(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(interactiveRoots.filter((root) => root.visible), true);
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
  }

  renderer.domElement.addEventListener('pointerdown', elementPressed);
  renderer.domElement.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      keyboardIndex = (keyboardIndex + direction + keyboardElements.length) % keyboardElements.length;
      onElementClick(keyboardElements[keyboardIndex]);
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onElementClick(keyboardElements[keyboardIndex]);
    }
  });

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    const aspect = width / height;
    const frustum = aspect < 0.9 ? 8.2 : 7.1;
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

  function animate(now) {
    if (destroyed) return;
    requestAnimationFrame(animate);
    const elapsed = Math.max((now - previousTime) / 1000, 0);
    const delta = Math.min(elapsed, 0.05);
    const timelineDelta = Math.min(elapsed, 0.25);
    previousTime = now;
    if (!document.hidden) {
      motion.tick(timelineDelta);
      const time = now / 1000;
      sadAmount = damp(sadAmount, sadTarget, 4, delta);
      cat.body.scale.y = cat.body.userData.baseScaleY * (1 + Math.sin(time * 1.8) * 0.008);
      mom.body.scale.y = mom.body.userData.baseScaleY * (1 + Math.sin(time * 1.7 + 1) * 0.008);
      cat.tail.rotation.y = reducedMotion ? 0 : Math.sin(time * 2.2) * 0.2;
      mom.tail.rotation.y = reducedMotion ? 0 : Math.sin(time * 1.9 + 1) * 0.16 * (1 - momTailAction);
      cat.ears.forEach((ear) => {
        const side = Math.sign(ear.userData.baseRotation || 0.01);
        ear.rotation.z = damp(ear.rotation.z, ear.userData.baseRotation + side * sadAmount * 0.2, 4, delta);
      });
    }
    renderer.render(scene, camera);
  }

  reset();
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
