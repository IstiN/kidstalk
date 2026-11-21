import * as THREE from 'three';
import { TweenManager } from '../core/TweenManager.js';

const C = {
  fur: 0xb9b1ce,
  wetFur: 0x8f89ad,
  innerEar: 0xe8b4b8,
  cream: 0xf4ede2,
  dark: 0x344542,
  nose: 0xd98286,
  wood: 0xc78e4e,
  woodLight: 0xe0ad68,
  ground: 0xaabca6,
  puddle: 0x8bb8c7,
};

export function createBunnyScene(container, { onElementClick = () => {}, onRainChange = () => {} } = {}) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = new TweenManager({ reducedMotion });
  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    container.innerHTML = '<div class="scene-fallback" role="button" tabindex="0" aria-label="Зайка. Нажмите, чтобы произнести слово"><span>🐰</span><small>Нажми на зайку</small></div>';
    const fallback = container.firstElementChild;
    fallback.addEventListener('click', () => onElementClick('bunny'));
    fallback.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') onElementClick('bunny');
    });
    return {
      async perform() { return true; },
      cancel() {},
      setRain() {},
      reset() {},
      destroy() {},
    };
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'button');
  renderer.domElement.setAttribute('aria-label', 'Интерактивная сцена. Стрелки выбирают предмет, Enter произносит его название.');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdde9e9);
  scene.fog = new THREE.Fog(0xdde9e9, 10, 21);

  const camera = new THREE.OrthographicCamera(-4, 4, 3.5, -3.5, 0.1, 60);
  camera.position.set(6.5, 4.6, 9);
  camera.lookAt(0, 1.35, 0);

  const hemisphere = new THREE.HemisphereLight(0xf3f8ff, 0x72836b, 2.3);
  scene.add(hemisphere);
  const sun = new THREE.DirectionalLight(0xfff4df, 3.1);
  sun.position.set(-3, 8, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -6;
  sun.shadow.camera.right = 6;
  sun.shadow.camera.top = 7;
  sun.shadow.camera.bottom = -5;
  sun.shadow.bias = -0.0005;
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xc8d7f1, 1.2);
  fill.position.set(5, 3, -4);
  scene.add(fill);

  const material = (color, options = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.82, ...options });
  const makeMesh = (geometry, meshMaterial, parent, position = [0, 0, 0], scale = [1, 1, 1]) => {
    const object = new THREE.Mesh(geometry, meshMaterial);
    object.position.set(...position);
    object.scale.set(...scale);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  };
  const addHitArea = (parent, elementId, geometry, position) => {
    const hitArea = makeMesh(geometry, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }), parent, position);
    hitArea.castShadow = false;
    hitArea.receiveShadow = false;
    hitArea.userData.elementId = elementId;
    return hitArea;
  };
  const sphere = new THREE.SphereGeometry(1, 28, 20);
  const box = new THREE.BoxGeometry(1, 1, 1);

  const ground = makeMesh(new THREE.CircleGeometry(9, 64), material(C.ground), scene, [0, -0.78, 0]);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.castShadow = false;

  const puddleMaterial = material(C.puddle, { transparent: true, opacity: 0.72, roughness: 0.28, metalness: 0.08 });
  const puddle = makeMesh(new THREE.CircleGeometry(1, 64), puddleMaterial, scene, [0.2, -0.765, 0.85], [2.25, 1.15, 1]);
  puddle.rotation.x = -Math.PI / 2;
  puddle.castShadow = false;
  puddle.userData.elementId = 'rain';

  const rings = [];
  for (let i = 0; i < 4; i += 1) {
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xe3f2f4, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
    const ring = makeMesh(new THREE.RingGeometry(0.13, 0.16, 32), ringMaterial, scene, [0, -0.75, 0.9]);
    ring.rotation.x = -Math.PI / 2;
    ring.castShadow = false;
    ring.userData.offset = i * 0.85;
    rings.push(ring);
  }

  const grassMaterial = material(0x789b77);
  const grassGeometry = new THREE.ConeGeometry(0.1, 0.55, 5);
  [[-3.2, 0.3], [-2.8, -1.3], [2.9, -0.8], [3.4, 0.5], [-1.8, -2.4], [2, -2.2]].forEach(([x, z], index) => {
    const tuft = new THREE.Group();
    tuft.position.set(x, -0.55, z);
    for (let j = 0; j < 3; j += 1) {
      const blade = makeMesh(grassGeometry, grassMaterial, tuft, [(j - 1) * 0.13, 0, 0], [0.75, 0.8 + j * 0.13, 0.75]);
      blade.rotation.z = (j - 1) * 0.3;
    }
    tuft.rotation.y = index * 0.8;
    scene.add(tuft);
  });

  const treeTrunk = material(0x8e7657);
  const treeLeaf = material(0x87a28b);
  [[-4.2, -3.4, 0.75], [3.5, -3.1, 1], [-5, -1, 0.6]].forEach(([x, z, size]) => {
    makeMesh(new THREE.CylinderGeometry(0.13, 0.19, 1.8, 8), treeTrunk, scene, [x, 0.05, z], [size, size, size]);
    makeMesh(sphere, treeLeaf, scene, [x, 1.25, z], [0.85 * size, 1.15 * size, 0.8 * size]);
    makeMesh(sphere, treeLeaf, scene, [x + 0.42 * size, 1.1, z], [0.62 * size, 0.8 * size, 0.6 * size]);
  });

  const bench = new THREE.Group();
  bench.userData.elementId = 'bench';
  scene.add(bench);
  const wood = material(C.wood);
  const woodLight = material(C.woodLight);
  [-0.43, 0, 0.43].forEach((z) => makeMesh(box, woodLight, bench, [0, 0.35, z], [3.65, 0.18, 0.36]));
  [1.05, 1.5].forEach((y) => makeMesh(box, woodLight, bench, [0, y, -0.53], [3.6, 0.32, 0.14]));
  [-1.4, 1.4].forEach((x) => {
    makeMesh(box, wood, bench, [x, 0.66, -0.54], [0.17, 2.05, 0.17]);
    [-0.37, 0.37].forEach((z) => makeMesh(box, wood, bench, [x, -0.18, z], [0.2, 1.05, 0.2]));
    makeMesh(box, wood, bench, [x, 0.03, 0], [0.16, 0.16, 1.12]);
  });
  addHitArea(bench, 'bench', new THREE.BoxGeometry(3.9, 2.0, 0.18), [0, 0.65, -0.72]);

  const bunny = new THREE.Group();
  bunny.userData.elementId = 'bunny';
  bunny.position.set(0, 0.48, 0.16);
  scene.add(bunny);
  const fur = material(C.fur);
  const cream = material(C.cream);
  const pink = material(C.innerEar);
  const dark = material(C.dark, { roughness: 0.45 });
  const noseMaterial = material(C.nose);

  makeMesh(sphere, fur, bunny, [0, 0.65, 0], [0.65, 0.82, 0.56]);
  makeMesh(sphere, cream, bunny, [0, 0.61, 0.48], [0.42, 0.53, 0.11]);
  makeMesh(sphere, fur, bunny, [0, 1.54, 0.02], [0.64, 0.59, 0.56]);

  const leftEar = new THREE.Group();
  const rightEar = new THREE.Group();
  leftEar.position.set(-0.28, 2.12, 0);
  rightEar.position.set(0.28, 2.12, 0);
  bunny.add(leftEar, rightEar);
  makeMesh(sphere, fur, leftEar, [0, 0.38, 0], [0.22, 0.72, 0.18]);
  makeMesh(sphere, pink, leftEar, [0, 0.4, 0.15], [0.11, 0.5, 0.055]);
  makeMesh(sphere, fur, rightEar, [0, 0.38, 0], [0.22, 0.72, 0.18]);
  makeMesh(sphere, pink, rightEar, [0, 0.4, 0.15], [0.11, 0.5, 0.055]);
  leftEar.rotation.z = 0.15;
  rightEar.rotation.z = -0.15;

  const bunnyArms = [];
  const bunnyFeet = [];
  [-1, 1].forEach((side) => {
    const arm = makeMesh(sphere, fur, bunny, [side * 0.56, 0.72, 0.19], [0.22, 0.51, 0.22]);
    arm.rotation.z = side * -0.24;
    arm.userData.baseRotation = arm.rotation.z;
    bunnyArms.push(arm);
    const foot = makeMesh(sphere, fur, bunny, [side * 0.37, 0.12, 0.42], [0.34, 0.29, 0.48]);
    const pad = makeMesh(sphere, pink, bunny, [side * 0.37, 0.12, 0.79], [0.22, 0.17, 0.09]);
    foot.userData.baseY = foot.position.y;
    foot.userData.baseZ = foot.position.z;
    pad.userData.baseY = pad.position.y;
    pad.userData.baseZ = pad.position.z;
    bunnyFeet.push({ foot, pad, side });
  });

  const eyes = [];
  [-1, 1].forEach((side) => {
    const eye = makeMesh(sphere, dark, bunny, [side * 0.23, 1.65, 0.51], [0.068, 0.083, 0.045]);
    eyes.push(eye);
    makeMesh(sphere, cream, bunny, [side * 0.214, 1.68, 0.553], [0.018, 0.022, 0.012]);
    makeMesh(sphere, pink, bunny, [side * 0.39, 1.43, 0.48], [0.1, 0.06, 0.025]);
  });
  makeMesh(sphere, noseMaterial, bunny, [0, 1.47, 0.58], [0.09, 0.065, 0.055]);

  const mouthMaterial = new THREE.LineBasicMaterial({ color: C.dark, linewidth: 2 });
  const mouthLeft = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 1.4, 0.593),
    new THREE.Vector3(-0.035, 1.32, 0.59),
    new THREE.Vector3(-0.13, 1.35, 0.56),
  );
  const mouthRight = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 1.4, 0.593),
    new THREE.Vector3(0.035, 1.32, 0.59),
    new THREE.Vector3(0.13, 1.35, 0.56),
  );
  [mouthLeft, mouthRight].forEach((curve) => {
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(12)), mouthMaterial);
    bunny.add(line);
  });
  const whiskerPoints = [];
  [-1, 1].forEach((side) => {
    [-0.06, 0.06].forEach((dy) => {
      whiskerPoints.push(
        new THREE.Vector3(side * 0.28, 1.43 + dy, 0.53),
        new THREE.Vector3(side * 0.67, 1.44 + dy * 2, 0.43),
      );
    });
  });
  bunny.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(whiskerPoints), mouthMaterial));

  const owner = new THREE.Group();
  owner.userData.elementId = 'owner';
  owner.position.set(-2.05, -0.72, 0.25);
  owner.scale.setScalar(1.22);
  scene.add(owner);
  const skin = material(0xefc3a5);
  const hair = material(0xb28b4c);
  const dress = material(0xdf8f63);
  makeMesh(sphere, hair, owner, [0, 1.75, -0.04], [0.34, 0.36, 0.3]);
  makeMesh(sphere, skin, owner, [0, 1.72, 0.12], [0.27, 0.28, 0.23]);
  makeMesh(sphere, dark, owner, [-0.09, 1.76, 0.33], [0.018, 0.022, 0.014]);
  makeMesh(sphere, dark, owner, [0.09, 1.76, 0.33], [0.018, 0.022, 0.014]);
  makeMesh(new THREE.ConeGeometry(0.48, 0.95, 20), dress, owner, [0, 0.95, 0]);
  const ownerArms = [];
  const ownerLegs = [];
  [-1, 1].forEach((side) => {
    const leg = makeMesh(new THREE.CylinderGeometry(0.055, 0.055, 0.55, 10), dark, owner, [side * 0.16, 0.25, 0]);
    leg.rotation.z = side * 0.06;
    leg.userData.baseRotation = leg.rotation.z;
    ownerLegs.push(leg);
    const arm = makeMesh(new THREE.CylinderGeometry(0.055, 0.055, 0.65, 10), skin, owner, [side * 0.39, 1.03, 0]);
    arm.rotation.z = side * -0.4;
    arm.userData.baseRotation = arm.rotation.z;
    ownerArms.push(arm);
  });
  addHitArea(owner, 'owner', new THREE.BoxGeometry(1.1, 2.5, 0.35), [0, 0.85, -0.2]);

  const clouds = new THREE.Group();
  clouds.userData.elementId = 'cloud';
  clouds.position.set(0, 4.15, -0.7);
  scene.add(clouds);
  const cloudMaterial = material(0xa9bdc7, { transparent: true, opacity: 0.95 });
  [[-1.05, 0, 0, 0.85], [-0.4, 0.18, 0, 1], [0.38, 0.08, 0, 1.05], [1.12, -0.08, 0, 0.78]].forEach(([x, y, z, size]) => {
    const puff = makeMesh(sphere, cloudMaterial, clouds, [x, y, z], [size, size * 0.56, size * 0.64]);
    puff.castShadow = false;
  });
  addHitArea(clouds, 'cloud', new THREE.BoxGeometry(3.5, 1.25, 0.5), [0, 0, -0.2]);

  const dropCount = 125;
  const rainPositions = new Float32Array(dropCount * 6);
  const rainSpeeds = [];
  for (let i = 0; i < dropCount; i += 1) {
    const x = (Math.random() - 0.5) * 7;
    const y = Math.random() * 5 - 0.6;
    const z = (Math.random() - 0.5) * 3.8;
    const index = i * 6;
    rainPositions[index] = x;
    rainPositions[index + 1] = y;
    rainPositions[index + 2] = z;
    rainPositions[index + 3] = x - 0.035;
    rainPositions[index + 4] = y - 0.19;
    rainPositions[index + 5] = z;
    rainSpeeds.push(2.9 + Math.random() * 2.2);
  }
  const rainGeometry = new THREE.BufferGeometry();
  rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rainMaterial = new THREE.LineBasicMaterial({ color: 0x72a6ba, transparent: true, opacity: 0.58 });
  const rain = new THREE.LineSegments(rainGeometry, rainMaterial);
  scene.add(rain);

  const stitchMaterial = new THREE.LineBasicMaterial({ color: 0x8c7168, transparent: true, opacity: 0.28 });
  const stitchPoints = [new THREE.Vector3(0, 0.2, 0.602), new THREE.Vector3(0, 1.02, 0.602)];
  for (let index = 0; index < 9; index += 1) {
    const y = 0.25 + index * 0.085;
    stitchPoints.push(new THREE.Vector3(-0.065, y, 0.608), new THREE.Vector3(0.065, y + 0.035, 0.608));
  }
  const stitches = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(stitchPoints), stitchMaterial);
  bunny.add(stitches);

  const focusMaterial = new THREE.MeshBasicMaterial({ color: 0xf3c96d, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
  const focusRing = new THREE.Mesh(new THREE.RingGeometry(0.72, 0.79, 48), focusMaterial);
  focusRing.rotation.x = -Math.PI / 2;
  focusRing.renderOrder = 4;
  scene.add(focusRing);

  const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0x548ea0, transparent: true, opacity: 0, depthWrite: false, depthTest: false });
  const spatialArrow = new THREE.Group();
  makeMesh(new THREE.CylinderGeometry(0.025, 0.025, 0.72, 10), arrowMaterial, spatialArrow, [0, 0.08, 0]);
  const arrowHead = makeMesh(new THREE.ConeGeometry(0.12, 0.28, 16), arrowMaterial, spatialArrow, [0, -0.4, 0]);
  arrowHead.rotation.z = Math.PI;
  spatialArrow.position.set(0.95, 2.85, 0.7);
  spatialArrow.traverse((object) => { object.renderOrder = 9; });
  scene.add(spatialArrow);

  const dropsMaterial = new THREE.MeshBasicMaterial({ color: 0x74b4ca, transparent: true, opacity: 0, depthWrite: false });
  const bodyDrops = new THREE.Group();
  [[-0.28, 2.05, 0.52], [0.31, 1.72, 0.54], [-0.43, 1.2, 0.52], [0.4, 0.88, 0.51], [-0.2, 0.55, 0.61], [0.27, 0.27, 0.64]].forEach((position) => {
    const drop = makeMesh(sphere, dropsMaterial, bodyDrops, position, [0.035, 0.065, 0.025]);
    drop.castShadow = false;
  });
  bunny.add(bodyDrops);

  const journeyMaterial = new THREE.MeshBasicMaterial({ color: 0x4f9db8, transparent: true, opacity: 0, depthWrite: false });
  const journeyDrop = makeMesh(sphere, journeyMaterial, bunny, [0.52, 2.55, 0.65], [0.07, 0.11, 0.05]);
  journeyDrop.castShadow = false;

  const heartCanvas = document.createElement('canvas');
  heartCanvas.width = 128;
  heartCanvas.height = 128;
  const heartContext = heartCanvas.getContext('2d');
  heartContext.fillStyle = '#d98286';
  heartContext.beginPath();
  heartContext.moveTo(64, 108);
  heartContext.bezierCurveTo(18, 78, 8, 52, 24, 32);
  heartContext.bezierCurveTo(40, 12, 58, 26, 64, 40);
  heartContext.bezierCurveTo(70, 26, 88, 12, 104, 32);
  heartContext.bezierCurveTo(120, 52, 110, 78, 64, 108);
  heartContext.fill();
  heartContext.strokeStyle = '#fff8f1';
  heartContext.lineWidth = 7;
  heartContext.beginPath();
  heartContext.moveTo(67, 28);
  heartContext.lineTo(53, 50);
  heartContext.lineTo(70, 64);
  heartContext.lineTo(54, 91);
  heartContext.stroke();
  const heartTexture = new THREE.CanvasTexture(heartCanvas);
  heartTexture.colorSpace = THREE.SRGBColorSpace;
  const heartMaterial = new THREE.SpriteMaterial({ map: heartTexture, transparent: true, opacity: 0, depthTest: false });
  const brokenHeart = new THREE.Sprite(heartMaterial);
  brokenHeart.position.set(0, 2.65, 0.8);
  brokenHeart.scale.set(0.75, 0.75, 1);
  brokenHeart.renderOrder = 10;
  bunny.add(brokenHeart);

  let rainEnabled = false;
  let rainAmount = 0;
  let wetAmount = 0;
  let wetTarget = 0;
  let sadTarget = 0;
  let hopTime = 10;
  let shiverTime = 10;
  let benchTime = 10;
  let ownerLeaving = false;
  let dropsFlash = 0;
  let destroyed = false;
  let previousTime = performance.now();
  const baseFur = new THREE.Color(C.fur);
  const wetFur = new THREE.Color(C.wetFur);
  const bunnyBaseY = bunny.position.y;
  const bunnyBaseZ = bunny.position.z;

  const completed = async (promises) => (await Promise.all(promises)).every(Boolean);

  function pulseFocus({ x = 0, y = 0.47, z = 0.16, scale = 1, duration = 1200 } = {}) {
    focusRing.position.set(x, y, z);
    return motion.tween({
      duration,
      ease: (value) => value,
      update: (_, progress) => {
        const size = scale * (0.72 + progress * 0.42);
        focusRing.scale.set(size, size, size);
        focusMaterial.opacity = Math.sin(progress * Math.PI) * 0.82;
      },
    });
  }

  function flashArrow({ x = 0.95, y = 2.85, z = 0.7, duration = 1400, scale = 1, rotation = 0, color = 0x548ea0 } = {}) {
    spatialArrow.position.set(x, y, z);
    spatialArrow.scale.setScalar(scale);
    spatialArrow.rotation.z = rotation;
    arrowMaterial.color.set(color);
    return motion.tween({
      duration,
      ease: (value) => value,
      update: (_, progress) => {
        arrowMaterial.opacity = Math.sin(progress * Math.PI) * 0.9;
        spatialArrow.position.y = y + Math.sin(progress * Math.PI * 3) * 0.06;
      },
    });
  }

  function waveBunny(duration = 1000) {
    const arm = bunnyArms[1];
    const base = arm.userData.baseRotation;
    return motion.tween({
      duration,
      ease: (value) => value,
      update: (_, progress) => {
        arm.rotation.z = base + Math.sin(progress * Math.PI * 4) * 0.42 * Math.sin(progress * Math.PI);
      },
    });
  }

  function walkOwner(toX, duration) {
    const fromX = owner.position.x;
    return motion.tween({
      duration,
      ease: (value) => value,
      update: (_, progress) => {
        owner.position.x = THREE.MathUtils.lerp(fromX, toX, progress);
        owner.position.y = -0.72 + Math.abs(Math.sin(progress * Math.PI * 8)) * 0.045;
        ownerLegs.forEach((leg, index) => {
          const side = index === 0 ? -1 : 1;
          leg.rotation.z = leg.userData.baseRotation + Math.sin(progress * Math.PI * 8) * 0.32 * side;
        });
        ownerArms.forEach((arm, index) => {
          const side = index === 0 ? -1 : 1;
          arm.rotation.z = arm.userData.baseRotation - Math.sin(progress * Math.PI * 8) * 0.22 * side;
        });
      },
    }).then((result) => {
      owner.position.y = -0.72;
      ownerLegs.forEach((leg) => { leg.rotation.z = leg.userData.baseRotation; });
      ownerArms.forEach((arm) => { arm.rotation.z = arm.userData.baseRotation; });
      return result;
    });
  }

  async function focusBunny() {
    hopTime = 0;
    return completed([
      pulseFocus({ duration: 1150 }),
      waveBunny(1100),
      motion.wait(1100),
    ]);
  }

  async function abandon() {
    if (!owner.visible) {
      owner.visible = true;
      owner.position.set(-2.05, -0.72, 0.25);
      owner.rotation.set(0, 0, 0);
    }
    ownerLeaving = true;
    sadTarget = 1;
    const turnStart = owner.rotation.y;
    const turned = await motion.tween({
      duration: 450,
      update: (value) => { owner.rotation.y = THREE.MathUtils.lerp(turnStart, -1.05, value); },
    });
    if (!turned) return false;
    brokenHeart.position.y = 2.65;
    const departure = await completed([
      walkOwner(-3.12, 2250),
      flashArrow({ x: -1.5, y: 2.65, z: 1.1, duration: 2250, scale: 1.3, rotation: -Math.PI / 2, color: 0xb95f54 }),
      motion.tween({
        duration: 2250,
        ease: (value) => value,
        update: (_, progress) => {
          heartMaterial.opacity = Math.sin(progress * Math.PI) * 0.9;
          brokenHeart.position.y = 2.65 + progress * 0.32;
        },
      }),
    ]);
    if (!departure) return false;
    return motion.tween({
      duration: 400,
      update: (value) => { owner.rotation.y = THREE.MathUtils.lerp(-1.05, 0.3, value); },
    });
  }

  async function focusOwner() {
    if (!owner.visible) {
      owner.visible = true;
      owner.position.set(-3.05, -0.72, 0.25);
      owner.rotation.set(0, 0.25, 0);
      ownerLeaving = true;
    }
    const arm = ownerArms[1];
    const base = arm.userData.baseRotation;
    const greeted = await completed([
      pulseFocus({ x: owner.position.x, y: -0.73, z: 0.25, scale: 0.72, duration: 1350 }),
      motion.tween({
        duration: 1350,
        ease: (value) => value,
        update: (_, progress) => {
          arm.rotation.z = base + Math.sin(progress * Math.PI * 4) * 0.5 * Math.sin(progress * Math.PI);
        },
      }),
    ]);
    if (!greeted || !ownerLeaving) return greeted;
    const turned = await motion.tween({
      duration: 300,
      update: (value) => { owner.rotation.y = THREE.MathUtils.lerp(0.3, -1.05, value); },
    });
    if (!turned) return false;
    const left = await walkOwner(-4.35, 1350);
    if (left) owner.visible = false;
    return left;
  }

  async function showUnder() {
    const startX = clouds.position.x;
    return completed([
      motion.tween({
        duration: 1250,
        update: (value) => { clouds.position.x = THREE.MathUtils.lerp(startX, 0, value); },
      }),
      flashArrow({ duration: 1450 }),
    ]);
  }

  async function startRain() {
    clouds.position.x = 0;
    setRain(true);
    await motion.wait(1500);
    return true;
  }

  async function focusCloud() {
    const startX = clouds.position.x;
    clouds.position.x = THREE.MathUtils.lerp(startX, 0, 0.65);
    cloudMaterial.emissive.set(0x6e8d99);
    return motion.tween({
      duration: 1300,
      ease: (value) => value,
      update: (_, progress) => {
        const pulse = Math.sin(progress * Math.PI);
        clouds.scale.setScalar(1 + pulse * 0.09);
        cloudMaterial.emissiveIntensity = pulse * 0.22;
      },
    }).then((result) => {
      clouds.scale.setScalar(1);
      cloudMaterial.emissiveIntensity = 0;
      return result;
    });
  }

  async function stayAlone() {
    owner.visible = false;
    ownerLeaving = true;
    sadTarget = 1;
    return completed([
      pulseFocus({ scale: 0.82, duration: 1400 }),
      motion.tween({
        duration: 1400,
        update: (value) => {
          bunny.rotation.y = Math.sin(value * Math.PI * 2) * 0.12;
        },
      }),
    ]);
  }

  async function showFromBench() {
    const startZ = bunny.position.z;
    return completed([
      motion.tween({
        duration: 1100,
        update: (value) => { bunny.position.z = THREE.MathUtils.lerp(startZ, bunnyBaseZ + 0.2, value); },
      }),
      pulseFocus({ x: 0, y: -0.73, z: 0.2, scale: 1.8, duration: 1200 }),
    ]);
  }

  async function focusBench() {
    benchTime = 0;
    wood.emissive.set(0x7a4b16);
    woodLight.emissive.set(0x7a4b16);
    return completed([
      flashArrow({ x: 1.18, y: 0.18, z: 0.82, scale: 0.85, duration: 1450 }),
      motion.tween({
        duration: 1450,
        ease: (value) => value,
        update: (_, progress) => {
          const glow = Math.sin(progress * Math.PI) * 0.28;
          wood.emissiveIntensity = glow;
          woodLight.emissiveIntensity = glow;
        },
      }),
    ]);
  }

  async function attemptDown() {
    const foot = bunnyFeet[1];
    const startZ = bunny.position.z;
    const moved = await completed([
      motion.tween({
        duration: 1550,
        update: (value) => {
          bunny.position.z = THREE.MathUtils.lerp(startZ, bunnyBaseZ + 0.4, value);
          bunny.rotation.x = THREE.MathUtils.lerp(0, 0.13, value);
          foot.foot.position.y = THREE.MathUtils.lerp(foot.foot.userData.baseY, -0.3, value);
          foot.pad.position.y = THREE.MathUtils.lerp(foot.pad.userData.baseY, -0.3, value);
          foot.foot.position.z = THREE.MathUtils.lerp(foot.foot.userData.baseZ, 0.63, value);
          foot.pad.position.z = THREE.MathUtils.lerp(foot.pad.userData.baseZ, 0.94, value);
        },
      }),
      flashArrow({ x: 0.95, y: 0.12, z: 1.05, scale: 0.72, duration: 1800 }),
    ]);
    if (!moved) return false;
    return motion.wait(350);
  }

  async function cannotDown() {
    sadTarget = 1;
    const refused = await motion.tween({
      duration: 900,
      ease: (value) => value,
      update: (_, progress) => {
        bunny.rotation.y = Math.sin(progress * Math.PI * 4) * 0.2 * (1 - progress);
      },
    });
    if (!refused) return false;
    const foot = bunnyFeet[1];
    return motion.tween({
      duration: 1250,
      update: (value) => {
        bunny.position.z = THREE.MathUtils.lerp(bunnyBaseZ + 0.4, bunnyBaseZ, value);
        bunny.rotation.x = THREE.MathUtils.lerp(0.13, 0, value);
        foot.foot.position.y = THREE.MathUtils.lerp(-0.3, foot.foot.userData.baseY, value);
        foot.pad.position.y = THREE.MathUtils.lerp(-0.3, foot.pad.userData.baseY, value);
        foot.foot.position.z = THREE.MathUtils.lerp(0.63, foot.foot.userData.baseZ, value);
        foot.pad.position.z = THREE.MathUtils.lerp(0.94, foot.pad.userData.baseZ, value);
      },
    });
  }

  async function showWhole() {
    setRain(true);
    wetTarget = Math.max(wetTarget, 0.22);
    return completed([
      pulseFocus({ scale: 1.05, duration: 1400 }),
      motion.tween({
        duration: 1400,
        ease: (value) => value,
        update: (_, progress) => { dropsFlash = Math.sin(progress * Math.PI); },
      }),
    ]);
  }

  async function showUntil() {
    setRain(true);
    journeyDrop.position.set(0.52, 2.55, 0.65);
    journeyMaterial.opacity = 1;
    stitchMaterial.opacity = 0.85;
    const traveled = await motion.tween({
      duration: 1350,
      ease: (value) => value,
      update: (_, progress) => {
        journeyDrop.position.y = THREE.MathUtils.lerp(2.55, 0.28, progress);
        journeyDrop.position.x = THREE.MathUtils.lerp(0.52, 0.06, progress);
      },
    });
    if (!traveled) return false;
    return motion.tween({
      duration: 250,
      update: (value) => { journeyMaterial.opacity = 1 - value; },
    });
  }

  async function showThreads() {
    setRain(true);
    wetTarget = Math.max(wetTarget, 0.52);
    const leftBase = bunnyArms[0].userData.baseRotation;
    const rightBase = bunnyArms[1].userData.baseRotation;
    return completed([
      pulseFocus({ scale: 0.85, duration: 1600 }),
      motion.tween({
        duration: 1600,
        ease: (value) => value,
        update: (_, progress) => {
          const reveal = Math.sin(progress * Math.PI);
          stitchMaterial.opacity = 0.28 + reveal * 0.72;
          bunnyArms[0].rotation.z = leftBase + reveal * 0.35;
          bunnyArms[1].rotation.z = rightBase - reveal * 0.35;
        },
      }),
    ]);
  }

  async function getWet() {
    setRain(true);
    sadTarget = 1;
    wetTarget = 1;
    shiverTime = 0;
    return completed([
      motion.wait(2200),
      motion.tween({
        duration: 1800,
        ease: (value) => value,
        update: (_, progress) => { dropsFlash = Math.sin(progress * Math.PI) * 0.65; },
      }),
    ]);
  }

  const actions = {
    focusBunny,
    abandon,
    focusOwner,
    showUnder,
    startRain,
    focusCloud,
    stayAlone,
    showFromBench,
    focusBench,
    attemptDown,
    cannotDown,
    showWhole,
    showUntil,
    showThreads,
    getWet,
  };

  async function perform(action) {
    const run = actions[action];
    if (!run) return true;
    return run();
  }

  function cancel() {
    motion.cancel();
    focusMaterial.opacity = 0;
    arrowMaterial.opacity = 0;
    journeyMaterial.opacity = 0;
    heartMaterial.opacity = 0;
    dropsFlash = 0;
  }

  function setRain(enabled) {
    rainEnabled = enabled;
    cloudMaterial.color.set(enabled ? 0xa9bdc7 : 0xcbd5d5);
    onRainChange(enabled);
  }

  function reset(initialState = {}) {
    const { owner: ownerState = 'near', rain: startsRaining = false, wet = 0 } = initialState;
    motion.cancel();
    setRain(startsRaining);
    rainAmount = startsRaining ? 1 : 0;
    wetTarget = wet;
    wetAmount = wet;
    sadTarget = 0;
    dropsFlash = 0;
    ownerLeaving = ownerState !== 'near';
    owner.visible = ownerState === 'near';
    owner.position.set(-2.05, -0.72, 0.25);
    owner.rotation.set(0, 0, 0);
    ownerArms.forEach((arm) => { arm.rotation.z = arm.userData.baseRotation; });
    ownerLegs.forEach((leg) => { leg.rotation.z = leg.userData.baseRotation; });
    bunny.position.z = bunnyBaseZ;
    bunny.rotation.set(0, 0, 0);
    bunnyArms.forEach((arm) => { arm.rotation.z = arm.userData.baseRotation; });
    bunnyFeet.forEach(({ foot, pad }) => {
      foot.position.y = foot.userData.baseY;
      foot.position.z = foot.userData.baseZ;
      pad.position.y = pad.userData.baseY;
      pad.position.z = pad.userData.baseZ;
    });
    hopTime = 10;
    shiverTime = 10;
    benchTime = 10;
    fur.color.lerpColors(baseFur, wetFur, wetAmount);
    clouds.position.x = startsRaining ? 0 : -1.35;
    clouds.scale.setScalar(1);
    cloudMaterial.emissiveIntensity = 0;
    focusMaterial.opacity = 0;
    arrowMaterial.opacity = 0;
    journeyMaterial.opacity = 0;
    heartMaterial.opacity = 0;
    dropsMaterial.opacity = 0;
    stitchMaterial.opacity = 0.28;
    wood.emissiveIntensity = 0;
    woodLight.emissiveIntensity = 0;
  }

  bunny.userData.elementId = 'bunny';
  owner.userData.elementId = 'owner';
  bench.userData.elementId = 'bench';
  clouds.userData.elementId = 'cloud';
  puddle.userData.elementId = 'rain';
  const interactiveRoots = [bunny, owner, bench, clouds, puddle];
  const keyboardElements = ['bunny', 'owner', 'bench', 'cloud', 'rain'];
  let keyboardIndex = 0;
  const raycaster = new THREE.Raycaster();
  raycaster.params.Line.threshold = 0.12;
  const pointer = new THREE.Vector2();

  function elementPressed(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const roots = interactiveRoots.filter((root) => root.visible);
    const hits = raycaster.intersectObjects(roots, true);
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
    if (rainEnabled && raycaster.intersectObject(rain, false).length) onElementClick('rain');
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
    const frustum = aspect < 0.9 ? 7.6 : 6.8;
    camera.left = (-frustum * aspect) / 2;
    camera.right = (frustum * aspect) / 2;
    camera.top = frustum / 2 + 0.25;
    camera.bottom = -frustum / 2 + 0.25;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  function animate(now) {
    if (destroyed) return;
    const elapsed = Math.max((now - previousTime) / 1000, 0);
    const delta = Math.min(elapsed, 0.05);
    const timelineDelta = Math.min(elapsed, 0.25);
    previousTime = now;
    const time = now / 1000;

    if (!document.hidden) {
      motion.tick(timelineDelta);
      rainAmount = THREE.MathUtils.damp(rainAmount, rainEnabled ? 1 : 0, 5, delta);
      rainMaterial.opacity = rainAmount * 0.58;
      cloudMaterial.opacity = 0.55 + rainAmount * 0.4;
      rain.visible = rainAmount > 0.02;

      if (!reducedMotion && rainAmount > 0.02) {
        const positions = rainGeometry.attributes.position.array;
        for (let i = 0; i < dropCount; i += 1) {
          const index = i * 6;
          const movement = rainSpeeds[i] * delta;
          positions[index + 1] -= movement;
          positions[index + 4] -= movement;
          if (positions[index + 1] < -0.65) {
            const newY = 4.25 + Math.random() * 0.5;
            positions[index + 1] = newY;
            positions[index + 4] = newY - 0.19;
          }
        }
        rainGeometry.attributes.position.needsUpdate = true;
      }

      hopTime += delta;
      shiverTime += delta;
      benchTime += delta;
      const hop = hopTime < 0.7 && !reducedMotion ? Math.sin((hopTime / 0.7) * Math.PI) * 0.36 : 0;
      const idle = reducedMotion ? 0 : Math.sin(time * 1.7) * 0.012;
      bunny.position.y = bunnyBaseY + hop + idle;
      const shivering = shiverTime < 1.2 || wetTarget > 0.85;
      const shiverStrength = wetTarget > 0.85 ? 0.007 : 0.018 * Math.max(0, 1 - shiverTime / 1.2);
      bunny.rotation.z = shivering && !reducedMotion ? Math.sin(time * 38) * shiverStrength : 0;
      bench.rotation.z = benchTime < 0.8 && !reducedMotion ? Math.sin(benchTime * 22) * 0.009 * (1 - benchTime / 0.8) : 0;
      leftEar.rotation.z = THREE.MathUtils.damp(leftEar.rotation.z, 0.15 + wetAmount * 0.34 + sadTarget * 0.08, 4, delta);
      rightEar.rotation.z = THREE.MathUtils.damp(rightEar.rotation.z, -0.15 - wetAmount * 0.34 - sadTarget * 0.08, 4, delta);
      wetAmount = THREE.MathUtils.damp(wetAmount, wetTarget, 3, delta);
      fur.color.lerpColors(baseFur, wetFur, wetAmount);
      dropsMaterial.opacity = Math.max(wetAmount * 0.75, dropsFlash);
      eyes.forEach((eye) => {
        eye.scale.y = THREE.MathUtils.damp(eye.scale.y, sadTarget ? 0.06 : 0.083, 5, delta);
      });
      rings.forEach((ring) => {
        const phase = ((time * 0.55 + ring.userData.offset) % 2.4) / 2.4;
        const scale = 0.4 + phase * 3.2;
        ring.scale.set(scale, scale, scale);
        ring.material.opacity = rainAmount * (1 - phase) * 0.38;
      });
      clouds.position.y = 4.15 + (reducedMotion ? 0 : Math.sin(time * 0.55) * 0.035);
      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }
  reset();
  requestAnimationFrame(animate);

  return {
    perform,
    cancel,
    setRain,
    reset,
    destroy() {
      destroyed = true;
      resizeObserver.disconnect();
      renderer.dispose();
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((item) => item.dispose());
        }
      });
    },
  };
}
