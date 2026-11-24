import * as THREE from 'three';

export const material = (color, options = {}) => new THREE.MeshStandardMaterial({
  color,
  roughness: 0.72,
  metalness: 0.02,
  ...options,
});

export function mesh(geometry, meshMaterial, parent, position, scale, rotation) {
  const object = new THREE.Mesh(geometry, meshMaterial);
  if (position) object.position.set(...position);
  if (scale) object.scale.set(...scale);
  if (rotation) object.rotation.set(...rotation);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}

export function createCurvedLine(points, radius, lineMaterial, parent) {
  const vectors = points.map((point) => new THREE.Vector3(...point));
  const curve = new THREE.CatmullRomCurve3(vectors);
  const group = new THREE.Group();
  mesh(new THREE.TubeGeometry(curve, 16, radius, 10, false), lineMaterial, group);
  const cap = new THREE.SphereGeometry(radius, 8, 8);
  mesh(cap, lineMaterial, group, points[0]);
  mesh(cap, lineMaterial, group, points[points.length - 1]);
  parent.add(group);
  return group;
}

const sphere = new THREE.SphereGeometry(1, 28, 20);

function buildHumanFace(head, { skinMat, hairMat, isMom = false }) {
  const white = material(0xffffff, { roughness: 0.3 });
  const dark = material(0x23302c, { roughness: 0.25 });
  const iris = material(isMom ? 0x4b8fb8 : 0x5c7c58, { roughness: 0.3 });
  const smileDark = material(0x5a3e3a, { roughness: 0.6 });
  const blush = material(0xf2a0aa, { transparent: true, opacity: 0.38, roughness: 0.9 });

  mesh(sphere, skinMat, head, [0, 0, 0], [0.42, 0.44, 0.38]);
  // Cute ears
  [-1, 1].forEach((side) => {
    mesh(sphere, skinMat, head, [side * 0.41, -0.02, -0.02], [0.09, 0.11, 0.07]);
  });
  // Friendly eyes with catchlights + brows + blush
  [-1, 1].forEach((side) => {
    const eye = new THREE.Group();
    eye.position.set(side * 0.145, 0.05, 0.34);
    eye.rotation.y = side * 0.16;
    head.add(eye);
    mesh(sphere, white, eye, [0, 0, 0], [0.095, 0.105, 0.04]);
    mesh(sphere, iris, eye, [side * -0.008, -0.004, 0.032], [0.062, 0.07, 0.018]);
    mesh(sphere, dark, eye, [side * -0.008, -0.004, 0.042], [0.038, 0.044, 0.014]);
    mesh(sphere, white, eye, [side * -0.008 - 0.018, 0.022, 0.052], [0.017, 0.019, 0.008]);
    createCurvedLine(
      [[side * 0.07, 0.19, 0.35], [side * 0.15, 0.215, 0.34], [side * 0.23, 0.185, 0.31]],
      0.014,
      hairMat,
      head,
    );
    mesh(sphere, blush, head, [side * 0.25, -0.08, 0.3], [0.068, 0.038, 0.02], [0, side * 0.5, 0]);
  });
  // Nose & warm smile
  mesh(sphere, skinMat, head, [0, -0.03, 0.39], [0.052, 0.045, 0.052]);
  createCurvedLine(
    [[-0.12, -0.14, 0.355], [0, -0.185, 0.375], [0.12, -0.14, 0.355]],
    0.016,
    smileDark,
    head,
  );
}

export function createDadActor() {
  const group = new THREE.Group();
  group.userData.elementId = 'dad';
  const skin = material(0xf3c7a8, { roughness: 0.72 });
  const hair = material(0x5b4232, { roughness: 0.85 });
  const sweater = material(0x46799b, { roughness: 0.8 });
  const collar = material(0xf6f2ea, { roughness: 0.8 });
  const pants = material(0x475569, { roughness: 0.84 });
  const shoe = material(0x5d4438, { roughness: 0.75 });

  // Torso
  mesh(new THREE.CapsuleGeometry(0.42, 0.72, 10, 20), sweater, group, [0, 1.32, 0]);
  mesh(new THREE.TorusGeometry(0.18, 0.04, 10, 24), collar, group, [0, 1.9, 0.04], [1, 1, 0.8], [Math.PI / 2, 0, 0]);
  mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.24, 14), skin, group, [0, 1.98, 0]);

  // Head
  const head = new THREE.Group();
  head.position.set(0, 2.38, 0.02);
  group.add(head);
  buildHumanFace(head, { skinMat: skin, hairMat: hair, isMom: false });
  // Cozy short dad hair
  mesh(sphere, hair, head, [0, 0.18, -0.04], [0.44, 0.34, 0.4]);
  mesh(sphere, hair, head, [-0.14, 0.38, 0.16], [0.22, 0.14, 0.18], [0, 0, 0.2]);
  mesh(sphere, hair, head, [0.14, 0.37, 0.14], [0.22, 0.13, 0.18], [0, 0, -0.18]);

  // Arms
  const arms = [];
  [-1, 1].forEach((side) => {
    const arm = new THREE.Group();
    arm.position.set(side * 0.48, 1.72, 0.02);
    arm.userData.baseRotationZ = side * 0.14;
    arm.rotation.z = arm.userData.baseRotationZ;
    group.add(arm);
    mesh(sphere, sweater, arm, [0, -0.05, 0], [0.14, 0.15, 0.14]);
    mesh(new THREE.CapsuleGeometry(0.1, 0.56, 8, 16), sweater, arm, [0, -0.36, 0]);
    mesh(sphere, skin, arm, [0, -0.71, 0.02], [0.115, 0.115, 0.1]);
    arms.push(arm);
  });

  // Legs
  [-1, 1].forEach((side) => {
    mesh(new THREE.CapsuleGeometry(0.14, 0.58, 8, 16), pants, group, [side * 0.2, 0.48, 0]);
    mesh(sphere, shoe, group, [side * 0.2, 0.1, 0.08], [0.16, 0.1, 0.24]);
  });

  return { group, head, arms };
}

export function createMomActor() {
  const group = new THREE.Group();
  group.userData.elementId = 'mom';
  const skin = material(0xf6ccb0, { roughness: 0.72 });
  const hair = material(0xb57b45, { roughness: 0.82 });
  const dress = material(0xe37d6b, { roughness: 0.78 });
  const collar = material(0xfffaf2, { roughness: 0.8 });
  const shoe = material(0x7c4b4a, { roughness: 0.75 });

  // Dress + neck
  mesh(new THREE.ConeGeometry(0.56, 1.25, 28), dress, group, [0, 1.15, 0]);
  mesh(sphere, collar, group, [0, 1.74, 0.02], [0.22, 0.07, 0.2]);
  mesh(new THREE.CylinderGeometry(0.095, 0.11, 0.24, 14), skin, group, [0, 1.84, 0]);

  // Head + soft bob hair
  const head = new THREE.Group();
  head.position.set(0, 2.22, 0.02);
  group.add(head);
  buildHumanFace(head, { skinMat: skin, hairMat: hair, isMom: true });
  mesh(sphere, hair, head, [0, 0.12, -0.07], [0.46, 0.45, 0.42]);
  mesh(sphere, hair, head, [-0.34, -0.06, -0.02], [0.16, 0.34, 0.22]);
  mesh(sphere, hair, head, [0.34, -0.06, -0.02], [0.16, 0.34, 0.22]);
  mesh(sphere, hair, head, [-0.15, 0.33, 0.2], [0.19, 0.12, 0.14], [0, 0, 0.25]);
  mesh(sphere, hair, head, [0.15, 0.33, 0.2], [0.19, 0.12, 0.14], [0, 0, -0.25]);

  const arms = [];
  [-1, 1].forEach((side) => {
    const arm = new THREE.Group();
    arm.position.set(side * 0.36, 1.62, 0.02);
    arm.userData.baseRotationZ = side * 0.2;
    arm.rotation.z = arm.userData.baseRotationZ;
    group.add(arm);
    mesh(sphere, dress, arm, [0, -0.04, 0], [0.13, 0.14, 0.13]);
    mesh(new THREE.CapsuleGeometry(0.085, 0.5, 8, 14), skin, arm, [0, -0.34, 0]);
    mesh(sphere, skin, arm, [0, -0.64, 0.02], [0.1, 0.1, 0.09]);
    arms.push(arm);
  });

  [-1, 1].forEach((side) => {
    mesh(new THREE.CapsuleGeometry(0.085, 0.44, 8, 14), skin, group, [side * 0.18, 0.36, 0]);
    mesh(sphere, shoe, group, [side * 0.18, 0.08, 0.07], [0.13, 0.085, 0.2]);
  });

  return { group, head, arms };
}

export function createTvProp() {
  const group = new THREE.Group();
  group.userData.elementId = 'tv';
  const wood = material(0xc49562, { roughness: 0.8 });
  const woodDark = material(0x9a6f42, { roughness: 0.84 });
  const frameMat = material(0x2d373d, { roughness: 0.5 });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x1e282d,
    emissive: 0x3898c8,
    emissiveIntensity: 0,
    roughness: 0.25,
  });
  const ledMat = new THREE.MeshStandardMaterial({
    color: 0xc9544d,
    emissive: 0xc9544d,
    emissiveIntensity: 0.5,
  });

  // Cozy wooden TV stand
  mesh(new THREE.BoxGeometry(2.05, 0.72, 0.72), wood, group, [0, 0.42, 0]);
  mesh(new THREE.BoxGeometry(0.88, 0.44, 0.06), woodDark, group, [-0.48, 0.42, 0.35]);
  mesh(new THREE.BoxGeometry(0.88, 0.44, 0.06), woodDark, group, [0.48, 0.42, 0.35]);
  [-0.86, 0.86].forEach((x) => {
    mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.12, 10), woodDark, group, [x, 0.05, 0.24]);
    mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.12, 10), woodDark, group, [x, 0.05, -0.24]);
  });

  // TV neck & rounded-feel body
  mesh(new THREE.BoxGeometry(0.54, 0.07, 0.32), frameMat, group, [0, 0.81, 0]);
  mesh(new THREE.BoxGeometry(0.16, 0.22, 0.12), frameMat, group, [0, 0.94, 0]);
  mesh(new THREE.BoxGeometry(1.9, 1.24, 0.16), frameMat, group, [0, 1.62, 0]);
  const screen = mesh(new THREE.PlaneGeometry(1.7, 1.04), screenMat, group, [0, 1.64, 0.09]);
  screen.castShadow = false;
  const led = mesh(sphere, ledMat, group, [0.76, 1.06, 0.09], [0.032, 0.032, 0.02]);

  // Animated cartoon shapes shown on the TV screen when turned ON
  const cartoon = new THREE.Group();
  cartoon.position.set(0, 1.64, 0.105);
  cartoon.visible = false;
  group.add(cartoon);
  const sun = mesh(sphere, material(0xf9d65c, { emissive: 0xf4b93d, emissiveIntensity: 0.5 }), cartoon, [-0.42, 0.2, 0], [0.18, 0.18, 0.012]);
  sun.castShadow = false;
  const cloud = new THREE.Group();
  cloud.position.set(0.32, 0.16, 0);
  const cloudMat = material(0xffffff, { emissive: 0xdff4ff, emissiveIntensity: 0.4 });
  [[-0.14, 0, 0.13, 0.1], [0, 0.05, 0.16, 0.12], [0.15, 0, 0.12, 0.09]].forEach(([cx, cy, sx, sy]) => {
    const puff = mesh(sphere, cloudMat, cloud, [cx, cy, 0], [sx, sy, 0.012]);
    puff.castShadow = false;
  });
  cartoon.add(cloud);
  const hill = mesh(sphere, material(0x6ec274, { emissive: 0x3b8a42, emissiveIntensity: 0.35 }), cartoon, [0, -0.33, 0], [0.64, 0.15, 0.012]);
  hill.castShadow = false;
  const star = mesh(sphere, material(0xff8da1, { emissive: 0xf05d78, emissiveIntensity: 0.45 }), cartoon, [0, -0.02, 0.01], [0.13, 0.13, 0.012]);
  star.castShadow = false;

  function setPower(on) {
    cartoon.visible = on;
    screenMat.color.set(on ? 0x8ad4f5 : 0x1e282d);
    screenMat.emissiveIntensity = on ? 0.42 : 0;
    ledMat.color.set(on ? 0x52d178 : 0xc9544d);
    ledMat.emissive.set(on ? 0x52d178 : 0xc9544d);
  }

  return { group, screen, cartoon, sun, cloud, hill, star, led, setPower };
}

export function createRemoteProp() {
  const group = new THREE.Group();
  group.userData.elementId = 'remote';
  mesh(new THREE.BoxGeometry(0.18, 0.06, 0.46), material(0x36434a, { roughness: 0.5 }), group);
  const onBtn = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16), material(0x47c96b, { emissive: 0x269946, emissiveIntensity: 0.4 }), group, [-0.03, 0.04, -0.12]);
  mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.025, 16), material(0xe05d53), group, [0.045, 0.038, -0.12]);
  [-0.04, 0.04].forEach((x) => {
    [0.02, 0.11].forEach((z) => {
      mesh(new THREE.BoxGeometry(0.04, 0.02, 0.04), material(0xdce3e6), group, [x, 0.035, z]);
    });
  });

  // Signal wave rings emitted when pressing ON
  const waves = new THREE.Group();
  waves.visible = false;
  group.add(waves);
  const waveMat = material(0x63d69d, { emissive: 0x39b578, emissiveIntensity: 0.5, transparent: true, opacity: 0.85 });
  [0.12, 0.2, 0.28].forEach((radius, index) => {
    const ring = mesh(new THREE.TorusGeometry(radius, 0.018, 8, 24, Math.PI * 0.7), waveMat, waves, [0, 0, -0.34 - index * 0.14], [1, 1, 1], [0, 0, -Math.PI * 0.35]);
    ring.castShadow = false;
  });

  return { group, onBtn, waves, waveMat };
}

export function createDrinkProp() {
  const group = new THREE.Group();
  group.userData.elementId = 'cup';
  mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.44, 24), material(0x69b8d4, { roughness: 0.35 }), group, [0, 0.22, 0]);
  mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.04, 24), material(0xdaf4fc, { roughness: 0.2 }), group, [0, 0.42, 0]);
  mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.36, 10), material(0xf0786c), group, [0.06, 0.52, 0], [1, 1, 1], [0, 0, -0.22]);
  return { group };
}

export function createBallProp() {
  const group = new THREE.Group();
  group.userData.elementId = 'ball';
  mesh(sphere, material(0xf09c54), group, [0, 0.32, 0], [0.32, 0.32, 0.32]);
  const stripe = material(0xfff6e8);
  mesh(new THREE.TorusGeometry(0.315, 0.03, 8, 32), stripe, group, [0, 0.32, 0], [1, 1, 1], [Math.PI / 2, 0, 0]);
  mesh(new THREE.TorusGeometry(0.315, 0.03, 8, 32), stripe, group, [0, 0.32, 0], [1, 1, 1], [0, Math.PI / 2, 0]);
  return { group };
}

export function createLampProp() {
  const group = new THREE.Group();
  group.userData.elementId = 'light';
  mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.08, 20), material(0x7c6a58), group, [0, 0.04, 0]);
  mesh(new THREE.CylinderGeometry(0.045, 0.055, 1.35, 14), material(0x9a8570), group, [0, 0.72, 0]);
  const shadeMat = material(0xf5e2b5, { emissive: 0xffd166, emissiveIntensity: 0.15, roughness: 0.6 });
  mesh(new THREE.ConeGeometry(0.42, 0.52, 24, 1, true), shadeMat, group, [0, 1.48, 0]);
  return {
    group,
    setLit(on) {
      shadeMat.emissiveIntensity = on ? 0.75 : 0.1;
    },
  };
}

export function createAppleProp() {
  const group = new THREE.Group();
  group.userData.elementId = 'apple';
  mesh(sphere, material(0xe3544c, { roughness: 0.38 }), group, [0, 0.28, 0], [0.28, 0.26, 0.28]);
  mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.16, 8), material(0x6e4f37), group, [0, 0.54, 0]);
  mesh(sphere, material(0x68b35e), group, [0.1, 0.56, 0], [0.11, 0.045, 0.06], [0, 0, 0.35]);
  return { group };
}

export function createBookProp() {
  const group = new THREE.Group();
  group.userData.elementId = 'book';
  mesh(new THREE.BoxGeometry(0.68, 0.08, 0.5), material(0x4b89a8), group, [0, 0.04, 0]);
  mesh(new THREE.BoxGeometry(0.62, 0.06, 0.44), material(0xfffaf0), group, [0, 0.1, 0]);
  return { group };
}

export function createCarProp() {
  const group = new THREE.Group();
  group.userData.elementId = 'car';
  const bodyMat = material(0xe66457, { roughness: 0.45 });
  const wheelMat = material(0x2d3538, { roughness: 0.75 });
  mesh(new THREE.BoxGeometry(0.95, 0.28, 0.52), bodyMat, group, [0, 0.24, 0]);
  mesh(new THREE.BoxGeometry(0.52, 0.24, 0.46), material(0xa8d8ea), group, [-0.05, 0.46, 0]);
  [[-0.28, 0.28], [0.28, 0.28], [-0.28, -0.28], [0.28, -0.28]].forEach(([x, z]) => {
    mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.08, 16), wheelMat, group, [x, 0.13, z], [1, 1, 1], [Math.PI / 2, 0, 0]);
  });
  return { group };
}

export const OBJECT_MATCHERS = [
  { objectId: 'dad', terms: ['папа', 'dad', 'daddy', 'papa', 'тата'] },
  { objectId: 'mom', terms: ['мама', 'mom', 'mommy', 'mama'] },
  { objectId: 'tv', terms: ['телевизор', 'телевезор', 'тв', 'мультики', 'мультик', 'tv', 'television', 'cartoon', 'тэлевізар'] },
  { objectId: 'turn-on', terms: ['включи', 'включить', 'turn on', 'switch on', 'уключы', 'уключыць'] },
  { objectId: 'turn-off', terms: ['выключи', 'выключить', 'turn off', 'выключы'] },
  { objectId: 'cup', terms: ['пить', 'вода', 'сок', 'молоко', 'чай', 'drink', 'water', 'juice', 'milk', 'піць', 'вада'] },
  { objectId: 'ball', terms: ['мяч', 'мячик', 'играть', 'ball', 'play'] },
  { objectId: 'light', terms: ['свет', 'лампа', 'light', 'святло'] },
  { objectId: 'apple', terms: ['яблоко', 'кушать', 'есть', 'еда', 'банан', 'apple', 'eat', 'food', 'яблык', 'есці'] },
  { objectId: 'book', terms: ['книга', 'книжку', 'читать', 'сказка', 'book', 'read', 'кніга'] },
  { objectId: 'car', terms: ['машина', 'машинка', 'ехать', 'car', 'машына'] },
];

export function matchObjectForWord(word) {
  const clean = String(word || '').trim().toLowerCase().replace(/ё/g, 'е');
  if (!clean) return null;
  for (const matcher of OBJECT_MATCHERS) {
    if (matcher.terms.some((term) => term === clean || (term.length >= 4 && clean.includes(term)))) {
      return matcher.objectId;
    }
  }
  return null;
}
