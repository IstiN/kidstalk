import * as THREE from 'three';
import { TweenManager } from '../core/TweenManager.js';

const material = (color, options = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.02, ...options });

function mesh(geometry, meshMaterial, parent, position, scale, rotation) {
  const object = new THREE.Mesh(geometry, meshMaterial);
  if (position) object.position.set(...position);
  if (scale) object.scale.set(...scale);
  if (rotation) object.rotation.set(...rotation);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}

function createCurvedLine(points, radius, lineMaterial, parent) {
  const vectors = points.map((point) => new THREE.Vector3(...point));
  const curve = new THREE.CatmullRomCurve3(vectors);
  const group = new THREE.Group();
  mesh(new THREE.TubeGeometry(curve, 20, radius, 10, false), lineMaterial, group);
  const capGeometry = new THREE.SphereGeometry(radius, 10, 8);
  mesh(capGeometry, lineMaterial, group, points[0]);
  mesh(capGeometry, lineMaterial, group, points[points.length - 1]);
  parent.add(group);
  return group;
}

function createTom() {
  const group = new THREE.Group();
  group.userData.elementId = 'tom';

  const fur = material(0x95908a, { roughness: 0.85 });
  const furStripe = material(0x746f69, { roughness: 0.86 });
  const cream = material(0xf7f2ea, { roughness: 0.82 });
  const pink = material(0xf29aa6, { roughness: 0.65 });
  const nosePink = material(0xf08596, { roughness: 0.45 });
  const red = material(0xe1544d, { roughness: 0.74 });
  const shortsBlue = material(0x5d7ca0, { roughness: 0.8 });
  const greenIris = material(0x49bd4c, { roughness: 0.25, emissive: 0x1e5c24, emissiveIntensity: 0.14 });
  const greenRing = material(0x2a7b33, { roughness: 0.35 });
  const pupilDark = material(0x1b2421, { roughness: 0.2 });
  const smileDark = material(0x523938, { roughness: 0.6 });
  const mouthInside = material(0x8e3b46, { roughness: 0.7 });
  const toothWhite = material(0xffffff, { roughness: 0.28 });
  const shoeGreen = material(0x63b273, { roughness: 0.6 });
  const sphere = new THREE.SphereGeometry(1, 32, 24);

  // Cozy torso: red t-shirt + denim shorts
  const body = new THREE.Group();
  body.position.set(0, 1.06, 0);
  body.userData.baseScale = new THREE.Vector3(1, 1, 1);
  group.add(body);

  mesh(sphere, red, body, [0, 0.08, 0], [0.54, 0.62, 0.42]);
  mesh(sphere, shortsBlue, body, [0, -0.34, 0], [0.5, 0.34, 0.4]);
  // Cute white collar & friendly shirt badge
  mesh(new THREE.TorusGeometry(0.24, 0.04, 12, 36), cream, body, [0, 0.57, 0.08], [1, 1, 0.85], [Math.PI / 2 - 0.15, 0, 0]);
  mesh(sphere, cream, body, [0, 0.06, 0.39], [0.22, 0.22, 0.05]);
  mesh(sphere, red, body, [0, 0.06, 0.425], [0.16, 0.16, 0.03]);
  createCurvedLine([[-0.07, 0.03, 0.45], [0, -0.02, 0.458], [0.07, 0.03, 0.45]], 0.014, cream, body);

  // Soft plush head
  const head = new THREE.Group();
  head.position.set(0, 2.18, 0.03);
  group.add(head);

  mesh(sphere, fur, head, [0, 0.1, 0], [0.8, 0.72, 0.68]);
  // Cute soft fur tuft on top of head
  mesh(sphere, fur, head, [-0.06, 0.79, 0.08], [0.11, 0.14, 0.09], [0.2, 0, 0.25]);
  mesh(sphere, fur, head, [0.06, 0.78, 0.06], [0.09, 0.12, 0.08], [0.15, 0, -0.3]);

  // Soft rounded plush cat ears (no sharp cones)
  [-1, 1].forEach((side) => {
    const ear = new THREE.Group();
    ear.position.set(side * 0.5, 0.68, -0.02);
    ear.rotation.z = side * -0.26;
    ear.rotation.y = side * 0.15;
    head.add(ear);
    mesh(sphere, fur, ear, [0, 0.1, 0], [0.29, 0.42, 0.19]);
    mesh(sphere, fur, ear, [0, 0.34, 0], [0.16, 0.2, 0.13]);
    mesh(sphere, pink, ear, [0, 0.1, 0.11], [0.17, 0.27, 0.09]);
  });

  // Big warm expressive eyes with clean eyelids, happy-squint arcs & eyebrows
  const eyes = [];
  const openEyes = [];
  const eyelids = [];
  const happyEyes = [];
  const eyebrows = [];
  [-1, 1].forEach((side) => {
    const eye = new THREE.Group();
    eye.position.set(side * 0.27, 0.21, 0.55);
    eye.rotation.y = side * 0.18;
    head.add(eye);
    eyes.push(eye);

    const openEye = new THREE.Group();
    eye.add(openEye);
    openEyes.push(openEye);

    // White sclera
    mesh(sphere, toothWhite, openEye, [0, 0, 0.01], [0.21, 0.23, 0.085]);
    // Emerald iris with darker rim
    mesh(sphere, greenRing, openEye, [side * -0.02, -0.01, 0.075], [0.142, 0.16, 0.032]);
    mesh(sphere, greenIris, openEye, [side * -0.02, -0.01, 0.09], [0.124, 0.142, 0.028]);
    // Big friendly round pupil
    mesh(sphere, pupilDark, openEye, [side * -0.02, -0.01, 0.106], [0.076, 0.092, 0.022]);
    // Two sparkling catchlights
    mesh(sphere, toothWhite, openEye, [side * -0.02 - 0.044, 0.052, 0.125], [0.036, 0.04, 0.014]);
    mesh(sphere, toothWhite, openEye, [side * -0.02 + 0.038, -0.052, 0.125], [0.018, 0.018, 0.01]);

    // Smooth eyelid dome (cleanly replaces open eye when closed)
    const lid = new THREE.Group();
    lid.visible = false;
    eye.add(lid);
    mesh(sphere, fur, lid, [0, 0.01, 0.025], [0.22, 0.238, 0.1]);
    createCurvedLine([[-0.15, -0.03, 0.13], [0, -0.075, 0.145], [0.15, -0.03, 0.13]], 0.018, smileDark, lid);
    eyelids.push(lid);

    // Joyful laughing eye arc (◠)
    const happy = new THREE.Group();
    happy.visible = false;
    eye.add(happy);
    mesh(sphere, fur, happy, [0, 0.01, 0.025], [0.22, 0.238, 0.1]);
    createCurvedLine([[-0.15, -0.01, 0.13], [0, 0.075, 0.15], [0.15, -0.01, 0.13]], 0.024, smileDark, happy);
    happyEyes.push(happy);

    // Soft curved eyebrow
    const brow = createCurvedLine(
      [[side * 0.14, 0.49, 0.57], [side * 0.28, 0.53, 0.55], [side * 0.42, 0.48, 0.5]],
      0.024,
      furStripe,
      head,
    );
    brow.userData.baseY = brow.position.y;
    eyebrows.push(brow);
  });

  // Soft plush muzzle cheeks + chin + cute pink nose
  mesh(sphere, cream, head, [-0.18, -0.1, 0.58], [0.26, 0.2, 0.18]);
  mesh(sphere, cream, head, [0.18, -0.1, 0.58], [0.26, 0.2, 0.18]);
  mesh(sphere, cream, head, [0, -0.24, 0.56], [0.24, 0.16, 0.16]);
  // Cute rounded pink cat nose
  mesh(sphere, nosePink, head, [0, 0.01, 0.74], [0.125, 0.088, 0.075]);
  mesh(sphere, toothWhite, head, [-0.035, 0.045, 0.795], [0.028, 0.016, 0.01]);

  // Subtle rosy blush tucked cleanly on cheeks
  const blushMat = material(0xf5a6b0, { transparent: true, opacity: 0.38, roughness: 0.9 });
  [-1, 1].forEach((side) => {
    mesh(sphere, blushMat, head, [side * 0.43, -0.07, 0.47], [0.095, 0.055, 0.025], [0, side * 0.55, 0]);
  });

  // Default rest mouth: gentle closed friendly cat smile
  const closedSmile = new THREE.Group();
  head.add(closedSmile);
  createCurvedLine(
    [[-0.2, -0.17, 0.7], [-0.09, -0.23, 0.735], [0, -0.215, 0.74], [0.09, -0.23, 0.735], [0.2, -0.17, 0.7]],
    0.018,
    smileDark,
    closedSmile,
  );
  createCurvedLine([[0, -0.06, 0.75], [0, -0.21, 0.74]], 0.013, smileDark, closedSmile);

  // Expressive open smiling mouth (for laugh, eat, sing)
  const openMouth = new THREE.Group();
  openMouth.position.set(0, -0.23, 0.67);
  openMouth.visible = false;
  head.add(openMouth);

  // Soft smiling upper lip curve framing the mouth
  createCurvedLine(
    [[-0.2, 0.05, 0.058], [-0.09, 0.012, 0.084], [0, 0.022, 0.088], [0.09, 0.012, 0.084], [0.2, 0.05, 0.058]],
    0.016,
    smileDark,
    openMouth,
  );
  // Warm berry-red mouth interior tucked cleanly under the upper lip
  const mouthCavity = mesh(sphere, mouthInside, openMouth, [0, -0.075, 0.015], [0.17, 0.095, 0.07]);
  // Cute pink tongue nestled inside
  const tongue = mesh(sphere, pink, openMouth, [0, -0.105, 0.058], [0.105, 0.042, 0.042]);

  // Clean smiling teeth display specifically for brushing teeth (friendly big grin)
  const brushMouth = new THREE.Group();
  brushMouth.position.set(0, -0.275, 0.675);
  brushMouth.visible = false;
  head.add(brushMouth);
  mesh(sphere, smileDark, brushMouth, [0, 0, 0], [0.21, 0.095, 0.055]);
  // Smooth rounded cartoon teeth set inside the dark smile border
  mesh(sphere, toothWhite, brushMouth, [0, 0.028, 0.032], [0.185, 0.045, 0.044]);
  mesh(sphere, toothWhite, brushMouth, [0, -0.028, 0.032], [0.175, 0.042, 0.042]);
  // Subtle horizontal line between upper & lower teeth
  createCurvedLine([[-0.155, 0, 0.074], [0, -0.005, 0.08], [0.155, 0, 0.074]], 0.007, smileDark, brushMouth);

  // Cute white whiskers
  const whiskerPoints = [];
  [-1, 1].forEach((side) => {
    [-0.11, -0.03].forEach((y, index) => {
      whiskerPoints.push(
        new THREE.Vector3(side * 0.34, y, 0.65),
        new THREE.Vector3(side * 0.74, y + (index === 0 ? -0.03 : 0.05), 0.54),
      );
    });
  });
  head.add(new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(whiskerPoints),
    new THREE.LineBasicMaterial({ color: 0xf4efe8, transparent: true, opacity: 0.7 }),
  ));

  // Plush arms with t-shirt sleeves and soft paws
  const arms = [];
  [-1, 1].forEach((side) => {
    const arm = new THREE.Group();
    arm.position.set(side * 0.53, 1.48, 0.04);
    arm.userData.baseRotationZ = side * 0.12;
    arm.rotation.z = arm.userData.baseRotationZ;
    group.add(arm);
    mesh(sphere, red, arm, [0, -0.07, 0], [0.18, 0.2, 0.18]);
    mesh(new THREE.CapsuleGeometry(0.115, 0.44, 8, 16), fur, arm, [0, -0.38, 0]);
    mesh(sphere, fur, arm, [0, -0.68, 0.04], [0.155, 0.165, 0.145]);
    mesh(sphere, pink, arm, [0, -0.69, 0.16], [0.07, 0.065, 0.025]);
    arms.push(arm);
  });

  // Plush legs with cute sneakers
  const legs = [];
  [-1, 1].forEach((side) => {
    const leg = new THREE.Group();
    leg.position.set(side * 0.25, 0.62, 0);
    group.add(leg);
    mesh(new THREE.CapsuleGeometry(0.14, 0.36, 8, 16), fur, leg, [0, -0.28, 0]);
    mesh(sphere, toothWhite, leg, [0, -0.56, 0.12], [0.22, 0.14, 0.32]);
    mesh(sphere, shoeGreen, leg, [0, -0.51, 0.23], [0.17, 0.055, 0.16]);
    legs.push(leg);
  });

  // Plush curved tail
  const tail = new THREE.Group();
  tail.position.set(0.35, 0.72, -0.26);
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.48, 0.08, -0.05),
    new THREE.Vector3(0.72, 0.48, 0.06),
    new THREE.Vector3(0.56, 0.82, 0.14),
  ]);
  mesh(new THREE.TubeGeometry(curve, 28, 0.09, 14, false), fur, tail);
  mesh(sphere, fur, tail, [0.56, 0.82, 0.14], [0.095, 0.095, 0.095]);
  group.add(tail);

  return {
    group, body, head, eyes, openEyes, eyelids, happyEyes, eyebrows,
    closedSmile, openMouth, brushMouth, mouthCavity, tongue,
    arms, legs, tail,
  };
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
  renderer.toneMappingExposure = 1.14;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'button');
  renderer.domElement.setAttribute('aria-label', 'Том. Нажми на героя или мяч.');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1ece3);
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  const defaultCameraPos = new THREE.Vector3(0.28, 1.85, 6.7);
  const defaultLookAt = new THREE.Vector3(0, 1.46, 0);
  const currentLookAt = defaultLookAt.clone();
  let viewportAspect = 1;

  // Soft warm sunlit studio lighting so Tom looks cozy & friendly
  scene.add(new THREE.HemisphereLight(0xfffaf2, 0xc9c0b5, 2.35));
  const keyLight = new THREE.DirectionalLight(0xfff1dc, 2.5);
  keyLight.position.set(2.5, 6.5, 6.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1536, 1536);
  Object.assign(keyLight.shadow.camera, { left: -5, right: 5, top: 6, bottom: -3, near: 0.5, far: 20 });
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xdfefff, 0.9);
  fillLight.position.set(-4, 3, 4);
  scene.add(fillLight);

  // Bright cozy room
  const floor = mesh(new THREE.PlaneGeometry(30, 30), material(0xe3d6c3, { roughness: 0.9 }), scene, [0, -0.05, 0]);
  floor.rotation.x = -Math.PI / 2;
  floor.castShadow = false;
  const wall = mesh(new THREE.PlaneGeometry(24, 12), material(0xf1ece3, { roughness: 0.95 }), scene, [0, 4, -3.2]);
  wall.castShadow = false;
  const rug = mesh(new THREE.CircleGeometry(1, 64), material(0xa8cfc9, { roughness: 0.92 }), scene, [0, -0.035, 0.3], [2.1, 1.35, 1]);
  rug.rotation.x = -Math.PI / 2;
  rug.castShadow = false;

  // Cozy pillow bed
  mesh(new THREE.BoxGeometry(2.45, 0.18, 1.35), material(0xb9cfd9), scene, [-1.1, 0.09, -1.15]);
  mesh(new THREE.SphereGeometry(1, 24, 16), material(0xf7dfb4), scene, [-1.8, 0.28, -1.12], [0.78, 0.22, 0.52]);

  // Cute washbasin
  const sink = new THREE.Group();
  sink.position.set(2.15, 0, -1.2);
  scene.add(sink);
  mesh(new THREE.CylinderGeometry(0.45, 0.34, 0.28, 28), material(0xf7f5f0), sink, [0, 1.05, 0]);
  mesh(new THREE.BoxGeometry(0.18, 1.0, 0.18), material(0xd8d5cf), sink, [0, 0.48, 0]);
  mesh(new THREE.TorusGeometry(0.19, 0.04, 8, 24, Math.PI), material(0x8fb0b6), sink, [0, 1.36, 0]);

  const tom = createTom();
  scene.add(tom.group);

  // Props
  const ball = new THREE.Group();
  ball.userData.elementId = 'ball';
  scene.add(ball);
  mesh(new THREE.SphereGeometry(0.26, 28, 20), material(0xf0a35c), ball);
  const stripeMat = material(0xfff5e8);
  mesh(new THREE.TorusGeometry(0.255, 0.025, 8, 36), stripeMat, ball).rotation.x = Math.PI / 2;
  mesh(new THREE.TorusGeometry(0.255, 0.025, 8, 36), stripeMat, ball).rotation.y = Math.PI / 2;

  const toothbrush = new THREE.Group();
  scene.add(toothbrush);
  mesh(new THREE.CapsuleGeometry(0.032, 0.46, 6, 12), material(0x52b6c9), toothbrush);
  mesh(new THREE.BoxGeometry(0.15, 0.09, 0.075), material(0xffffff), toothbrush, [0.02, 0.27, 0]);
  mesh(new THREE.BoxGeometry(0.04, 0.07, 0.08), material(0x7be0c3), toothbrush, [0.07, 0.27, 0]);
  toothbrush.rotation.z = Math.PI / 2;

  // Toothpaste foam bubbles around the smile during brushing
  const foam = new THREE.Group();
  scene.add(foam);
  const foamMat = material(0xffffff, { roughness: 0.45, transparent: true, opacity: 0.9 });
  [
    [-0.18, 1.96, 0.8], [-0.07, 1.92, 0.83], [0.06, 1.93, 0.84],
    [0.17, 1.97, 0.8], [0.0, 2.02, 0.85], [-0.12, 2.01, 0.82],
  ].forEach((pos, index) => {
    const puff = mesh(new THREE.SphereGeometry(0.048 + (index % 3) * 0.015, 16, 12), foamMat, foam, pos);
    puff.userData.basePosition = puff.position.clone();
  });

  const microphone = new THREE.Group();
  scene.add(microphone);
  mesh(new THREE.CapsuleGeometry(0.038, 0.36, 6, 12), material(0x46565d), microphone);
  mesh(new THREE.SphereGeometry(0.115, 20, 14), material(0xa8bbc2, { roughness: 0.4, metalness: 0.25 }), microphone, [0, 0.27, 0]);
  mesh(new THREE.TorusGeometry(0.115, 0.016, 8, 24), material(0x5f7077), microphone, [0, 0.27, 0]);
  microphone.rotation.z = -0.32;

  const bowl = new THREE.Group();
  scene.add(bowl);
  mesh(new THREE.CylinderGeometry(0.32, 0.22, 0.18, 28), material(0xe37c6d), bowl);
  mesh(new THREE.SphereGeometry(1, 20, 12), material(0xd49a5a), bowl, [0, 0.1, 0], [0.24, 0.07, 0.24]);

  const bubbles = new THREE.Group();
  scene.add(bubbles);
  const bubbleMat = material(0xdaf4f8, { transparent: true, opacity: 0.72, roughness: 0.2 });
  [[-0.58, 2.05, 0.75], [0.58, 2.25, 0.7], [-0.36, 2.65, 0.68], [0.38, 2.78, 0.65]].forEach((position, index) => {
    const bubble = mesh(new THREE.SphereGeometry(0.1 + index * 0.02, 18, 12), bubbleMat, bubbles, position);
    bubble.userData.basePosition = bubble.position.clone();
  });

  const notes = new THREE.Group();
  scene.add(notes);
  const noteMat = material(0xe0a543, { emissive: 0xb98536, emissiveIntensity: 0.18 });
  [[-0.68, 2.25, 0.55], [0.68, 2.5, 0.5]].forEach((position) => {
    const note = new THREE.Group();
    note.position.set(...position);
    notes.add(note);
    mesh(new THREE.SphereGeometry(0.085, 16, 12), noteMat, note, [0, 0, 0], [1.2, 0.8, 0.5]);
    mesh(new THREE.BoxGeometry(0.032, 0.34, 0.032), noteMat, note, [0.075, 0.18, 0]);
    note.userData.basePosition = note.position.clone();
  });

  function setCameraFrame(envelope, targetPos, targetLook) {
    const distanceBoost = viewportAspect < 0.72 ? 1.15 : 1;
    const basePos = defaultCameraPos.clone().setZ(defaultCameraPos.z * distanceBoost);
    const goalPos = new THREE.Vector3(...targetPos);
    goalPos.z *= viewportAspect < 0.72 ? 1.12 : 1;
    camera.position.lerpVectors(basePos, goalPos, envelope);
    currentLookAt.lerpVectors(defaultLookAt, new THREE.Vector3(...targetLook), envelope);
    camera.lookAt(currentLookAt);
  }

  function setOpenMouth(amount, { brush = false, width = 1 } = {}) {
    const isOpen = amount > 0.04;
    tom.closedSmile.visible = !isOpen;
    tom.openMouth.visible = isOpen && !brush;
    tom.brushMouth.visible = isOpen && brush;
    if (brush) {
      tom.brushMouth.scale.set(0.85 + 0.25 * amount, 0.75 + 0.35 * amount, 1);
    } else {
      tom.openMouth.scale.set(0.78 + width * 0.28 * amount, Math.max(0.3, amount), 1);
    }
  }

  function setEyeState(mode = 'open') {
    tom.openEyes.forEach((openEye) => { openEye.visible = mode === 'open'; });
    tom.eyelids.forEach((lid) => { lid.visible = mode === 'closed'; });
    tom.happyEyes.forEach((happy) => { happy.visible = mode === 'happy'; });
  }

  function reachArm(arm, envelope, targetPosition, extension = 1.25) {
    const rest = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, arm.userData.baseRotationZ));
    const direction = new THREE.Vector3(...targetPosition).sub(arm.position).normalize();
    const reach = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, -1, 0), direction);
    arm.quaternion.slerpQuaternions(rest, reach, envelope);
    arm.scale.y = 1 + (extension - 1) * envelope;
  }

  function restorePose() {
    setCameraFrame(0, [defaultCameraPos.x, defaultCameraPos.y, defaultCameraPos.z], [defaultLookAt.x, defaultLookAt.y, defaultLookAt.z]);
    tom.group.position.set(0, 0, 0);
    tom.group.rotation.set(0, 0, 0);
    tom.head.rotation.set(0, 0, 0);
    tom.arms.forEach((arm) => {
      arm.rotation.set(0, 0, arm.userData.baseRotationZ);
      arm.scale.set(1, 1, 1);
    });
    tom.legs.forEach((leg) => leg.rotation.set(0, 0, 0));
    tom.eyebrows.forEach((brow) => { brow.position.y = brow.userData.baseY; });
    setEyeState('open');
    setOpenMouth(0);
    ball.position.set(1.05, 0.26, 0.65);
    ball.rotation.set(0, 0, 0);
    toothbrush.visible = false;
    foam.visible = false;
    microphone.visible = false;
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
    return motion.tween({
      duration,
      ease: (value) => value,
      update: (_, progress) => {
        const envelope = Math.sin(progress * Math.PI);
        update(progress, envelope);
      },
    }).then((result) => {
      if (result) restorePose();
      return result;
    });
  }

  const actions = {
    walk: () => animateAction(1900, (progress, envelope) => {
      const step = Math.sin(progress * Math.PI * 4);
      tom.group.position.x = Math.sin(progress * Math.PI * 2) * 0.6;
      tom.legs[0].rotation.x = step * 0.48 * envelope;
      tom.legs[1].rotation.x = -step * 0.48 * envelope;
      tom.arms[0].rotation.x = -step * 0.38 * envelope;
      tom.arms[1].rotation.x = step * 0.38 * envelope;
    }),
    run: () => animateAction(1800, (progress, envelope) => {
      const step = Math.sin(progress * Math.PI * 8);
      tom.group.position.x = Math.sin(progress * Math.PI * 2) * 0.95;
      tom.group.position.y = Math.abs(step) * 0.08 * envelope;
      tom.legs[0].rotation.x = step * 0.72 * envelope;
      tom.legs[1].rotation.x = -step * 0.72 * envelope;
      tom.arms[0].rotation.x = -step * 0.6 * envelope;
      tom.arms[1].rotation.x = step * 0.6 * envelope;
    }),
    jump: () => animateAction(1500, (progress, envelope) => {
      tom.group.position.y = Math.sin(progress * Math.PI) * 0.8;
      tom.arms[0].rotation.z = tom.arms[0].userData.baseRotationZ - envelope * 1.85;
      tom.arms[1].rotation.z = tom.arms[1].userData.baseRotationZ + envelope * 1.85;
    }),
    hello: () => animateAction(2100, (progress, envelope) => {
      setCameraFrame(envelope, [0.22, 2.15, 4.3], [0, 1.85, 0.1]);
      tom.arms[1].rotation.z = tom.arms[1].userData.baseRotationZ + envelope * (2.2 + Math.sin(progress * Math.PI * 6) * 0.18);
      tom.head.rotation.z = -envelope * 0.1;
      tom.eyebrows.forEach((brow) => { brow.position.y = brow.userData.baseY + 0.04 * envelope; });
    }),
    laugh: () => animateAction(1900, (progress, envelope) => {
      // Close-up on Tom's joyful laughing face
      setCameraFrame(envelope, [0.12, 2.34, 2.75], [0, 2.24, 0.25]);
      const giggle = Math.abs(Math.sin(progress * Math.PI * 4));
      tom.group.position.y = giggle * 0.06 * envelope;
      tom.head.rotation.x = -0.1 * envelope;
      tom.head.rotation.z = Math.sin(progress * Math.PI * 4) * 0.05 * envelope;
      tom.eyebrows.forEach((brow) => { brow.position.y = brow.userData.baseY + 0.055 * envelope; });
      setEyeState(envelope > 0.25 ? 'happy' : 'open');
      setOpenMouth(envelope * (0.75 + giggle * 0.35), { width: 1.05 });
    }),
    dance: () => animateAction(2300, (progress, envelope) => {
      const beat = Math.sin(progress * Math.PI * 4);
      tom.group.rotation.y = beat * 0.32 * envelope;
      tom.group.rotation.z = beat * 0.07 * envelope;
      tom.group.position.y = Math.abs(beat) * 0.12 * envelope;
      tom.arms[0].rotation.z = tom.arms[0].userData.baseRotationZ - beat * 1.15 * envelope;
      tom.arms[1].rotation.z = tom.arms[1].userData.baseRotationZ - beat * 1.15 * envelope;
    }),
    'brush-teeth': () => animateAction(2500, (progress, envelope) => {
      // Close-up right on Tom's face so the child sees the smile, brush & foam clearly
      setCameraFrame(envelope, [0.14, 2.3, 2.75], [0.02, 2.16, 0.3]);
      const scrub = Math.sin(progress * Math.PI * 8) * 0.09 * envelope;
      reachArm(tom.arms[1], envelope, [0.24 + scrub * 0.4, 1.84, 0.78], 1.25);
      toothbrush.position.set(0.1 + scrub, 1.9, 0.87);
      setOpenMouth(envelope * 0.9, { brush: true });
      foam.children.forEach((puff, index) => {
        const pulse = 0.65 + Math.sin(progress * Math.PI * 6 + index) * 0.25;
        puff.scale.setScalar(envelope * pulse * 0.65);
        puff.position.x = puff.userData.basePosition.x + scrub * 0.35;
        puff.position.y = puff.userData.basePosition.y - 0.05;
      });
    }, { show: [toothbrush, foam] }),
    wash: () => animateAction(2200, (progress, envelope) => {
      setCameraFrame(envelope, [0.14, 2.3, 3.0], [0, 2.2, 0.25]);
      const scrub = Math.sin(progress * Math.PI * 6);
      reachArm(tom.arms[0], envelope, [-0.42, 2.08 + scrub * 0.06, 0.65], 1.2);
      reachArm(tom.arms[1], envelope, [0.42, 2.08 - scrub * 0.06, 0.65], 1.2);
      setEyeState(envelope > 0.3 ? 'happy' : 'open');
      bubbles.children.forEach((bubble, index) => {
        bubble.position.y = bubble.userData.basePosition.y + progress * (0.25 + index * 0.08);
        bubble.scale.setScalar(0.5 + envelope * 0.65);
      });
    }, { show: [bubbles] }),
    eat: () => animateAction(2200, (progress, envelope) => {
      // Close-up on face & bowl
      setCameraFrame(envelope, [0.22, 2.12, 3.05], [0.05, 1.98, 0.3]);
      const chew = Math.abs(Math.sin(progress * Math.PI * 4));
      tom.head.rotation.x = envelope * (0.14 + chew * 0.08);
      reachArm(tom.arms[1], envelope, [0.36, 1.48, 0.76], 1.15);
      bowl.position.set(0.32, 1.48 + envelope * 0.14, 0.76);
      setOpenMouth(envelope * (0.25 + chew * 0.65), { width: 0.85 });
    }, { show: [bowl] }),
    sleep: () => animateAction(2500, (progress, envelope) => {
      // Frame Tom comfortably centered with head & ears resting on the yellow pillow
      setCameraFrame(envelope, [-0.85, 2.35, 6.2], [-0.95, 0.55, -1.0]);
      tom.group.position.set(0.55 * envelope, 0.44 * envelope, -1.12 * envelope);
      tom.group.rotation.z = 1.46 * envelope;
      tom.head.rotation.z = -0.1 * envelope;
      setEyeState(envelope > 0.2 ? 'closed' : 'open');
    }),
    ball: () => animateAction(2000, (progress, envelope) => {
      tom.legs[1].rotation.x = -envelope * 1.05;
      ball.position.x = 1.05 + Math.sin(progress * Math.PI) * 0.95;
      ball.position.y = 0.26 + Math.abs(Math.sin(progress * Math.PI * 2)) * 0.35 * envelope;
      ball.rotation.z = -progress * 7;
    }),
    sing: () => animateAction(2300, (progress, envelope) => {
      // Close-up on face & microphone
      setCameraFrame(envelope, [0.18, 2.28, 2.85], [0.02, 2.18, 0.28]);
      const note = Math.sin(progress * Math.PI * 6);
      setOpenMouth(envelope * (0.65 + (note + 1) * 0.25), { width: 0.75 });
      tom.arms[0].rotation.z = tom.arms[0].userData.baseRotationZ - envelope * 0.9;
      reachArm(tom.arms[1], envelope, [0.22, 1.62, 0.8], 1.15);
      microphone.position.set(0.18, 1.65, 0.86);
      tom.head.rotation.z = note * 0.08 * envelope;
      notes.children.forEach((item, index) => {
        item.position.y = item.userData.basePosition.y + progress * (0.35 + index * 0.14);
      });
    }, { show: [microphone, notes] }),
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
    viewportAspect = width / height;
    camera.aspect = viewportAspect;
    camera.fov = viewportAspect < 0.72 ? 38 : 34;
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
      tom.tail.rotation.y = reducedMotion ? 0 : Math.sin(time * 2.1) * 0.22;
      tom.body.scale.y = tom.body.userData.baseScale.y * (1 + Math.sin(time * 1.8) * 0.008);
      if (!motion.items.size && !reducedMotion) {
        const blink = (time % 4.2) < 0.14;
        setEyeState(blink ? 'closed' : 'open');
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
