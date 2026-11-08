// Procedural 3D brain. No external model: hemispheres, cerebellum and brainstem are
// displaced spheres, so the region markers line up with the 2D schematic's coordinates.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const A = window.atlas;
const box = document.getElementById('b3');
const coarse = matchMedia('(pointer: coarse)').matches;           // touch screens
const small = coarse || matchMedia('(max-width: 760px)').matches;  // lighter model + render
const labels = document.getElementById('b3-labels');
const info = document.getElementById('b3-info');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
camera.position.set(-5.1, 0.9, -1.4);
const renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: small ? 'low-power' : 'default' });
renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 2));
box.prepend(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 3.2;
controls.maxDistance = 9;
controls.enablePan = false;
controls.autoRotate = !matchMedia('(prefers-reduced-motion: reduce)').matches;
controls.autoRotateSpeed = 0.6;
controls.target.set(0, -0.35, 0);
// touch: the page keeps scrolling until the visitor chooses to explore the model
const canvas = renderer.domElement, touchBtn = document.getElementById('b3-touch'), doneBtn = document.getElementById('b3-done');
function setExplore(on) {
  controls.enabled = on; box.classList.toggle('active', on && coarse);
  canvas.style.touchAction = on ? 'none' : 'pan-y';
  if (touchBtn) touchBtn.hidden = on; if (doneBtn) doneBtn.hidden = !on;
  if (on) controls.autoRotate = false;
  showInfo(sel[0] || null);
}
if (coarse) { touchBtn.onclick = () => setExplore(true); doneBtn.onclick = () => setExplore(false); }

scene.add(new THREE.HemisphereLight(0xfffaf2, 0xb9ab98, 1.1));
const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(-3, 4, 3); scene.add(key);
const rim = new THREE.DirectionalLight(0xffe6d2, 0.7); rim.position.set(3, 1, -4); scene.add(rim);

// cheap smooth 3D noise for the folds
function hash(x, y, z) { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return s - Math.floor(s); }
function noise(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  let r = 0;
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++)
    r += hash(xi + i, yi + j, zi + k) * (i ? u : 1 - u) * (j ? v : 1 - v) * (k ? w : 1 - w);
  return r;
}
// ridged noise reads as gyri and sulci
// gyri: rounded ridges with thin grooves (sulci) where warped noise crosses its midpoint
const ss = (e0, e1, x) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
const gyri = (x, y, z) => {
  const wx = x + 0.35 * noise(y * 2, z * 2, x * 2), wy = y + 0.35 * noise(z * 2 + 5, x * 2, y * 2), wz = z + 0.35 * noise(x * 2 + 9, y * 2, z * 2);
  const g1 = ss(0, 0.16, Math.abs(noise(wx * 3.2, wy * 3.2, wz * 3.2) * 2 - 1));
  const g2 = ss(0, 0.2, Math.abs(noise(wx * 6.5 + 3, wy * 6.5, wz * 6.5) * 2 - 1));
  return 0.7 * g1 + 0.3 * g2;
};

const tissue = new THREE.MeshStandardMaterial({ color: 0xe9dccd, roughness: 0.78, metalness: 0 });
const deepMat = new THREE.MeshStandardMaterial({ color: 0xdccbb6, roughness: 0.85 });

function blob(sx, sy, sz, detail, shape) {
  const g = new THREE.IcosahedronGeometry(1, detail);
  const p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const d = shape(v.x, v.y, v.z);
    v.set(v.x * sx * d, v.y * sy * d, v.z * sz * d);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}
const brain = new THREE.Group(); scene.add(brain);
// cerebrum: two hemispheres with a slight midline gap
for (const side of [-1, 1]) {
  const g = blob(0.74, 1.05, 1.72, small ? 40 : 64, (x, y, z) => {
    let d = 1 + 0.05 * gyri(x + side * 3, y, z) - 0.03;
    const inner = Math.max(0, -x * side - 0.55); d *= 1 - inner * 0.3;   // flatter midline face
    const under = Math.max(0, -y - 0.3); d *= 1 - under * 0.22;          // flatter underside
    d *= 1 + 0.06 * z;                                                   // frontal pole (-z) slightly narrower
    return d;
  });
  const m = new THREE.Mesh(g, tissue); m.position.x = side * 0.76; brain.add(m);
  const tg = blob(0.46, 0.4, 0.9, small ? 26 : 40, (x, y, z) => 1 + 0.06 * gyri(x + 9 + side, y, z) - 0.03);
  const tl = new THREE.Mesh(tg, tissue); tl.position.set(side * 1.0, -0.55, -0.15); tl.rotation.x = 0.18; brain.add(tl);
}
// cerebellum with horizontal folds
const cbG = blob(1.0, 0.5, 0.62, small ? 22 : 32, (x, y, z) => 1 + 0.03 * Math.sin(y * 34) + 0.015 * noise(x * 6, y * 6, z * 6));
const cb = new THREE.Mesh(cbG, tissue); cb.position.set(0, -0.95, 1.12); brain.add(cb);
// brainstem
const bsG = new THREE.CylinderGeometry(0.24, 0.17, 1.4, 32); bsG.rotateX(-0.32);
const bs = new THREE.Mesh(bsG, deepMat); bs.position.set(0, -1.35, 0.45); brain.add(bs);

// region markers: 2D schematic (front = left) to 3D (front = +z), cortex on the left hemisphere surface
const deepX = { thal: -0.32, bg: -0.48, hip: -0.62, amy: -0.6, ins: -0.98, cc: 0, cing: -0.12, opt: -0.25, olf: -0.3, bs: 0, cord: 0, cb: -0.5 };
function to3(r, k) {
  const z = (r.x - 517) / 185 * 1.72, y = (478 - r.y) / 132 * 1.0;
  if (k === 'ofc') return new THREE.Vector3(-0.55, -0.4, -1.2);   // underside, behind the eyes
  if (k === 'cb') return new THREE.Vector3(-0.6, -0.95, 1.3);
  if (k === 'bs') return new THREE.Vector3(0, -1.3, 0.5);
  if (k === 'cord') return new THREE.Vector3(0, -2.0, 0.7);
  if (k in deepX) return new THREE.Vector3(deepX[k], Math.max(y, -0.75), z);
  const t = Math.max(0, 1 - (y / 1.07) ** 2 - (z / 1.76) ** 2);
  const out = (k === 'temp' || k === 'aud' || k === 'ffa' || k === 'v4') ? 1.48 : 0.76 + 0.8 * Math.sqrt(t);
  return new THREE.Vector3(-out, y, z);
}
const markers = {};
const glow = new THREE.SphereGeometry(1, 24, 16);
for (const k in A.REG) {
  const r = A.REG[k], pos = to3(r, k), deep = k in deepX;
  const mat = new THREE.MeshBasicMaterial({ color: 0xb8321f, transparent: true, opacity: deep ? 0.35 : 0.55, depthTest: !deep });
  const m = new THREE.Mesh(glow, mat); m.position.copy(pos); m.scale.setScalar((deep ? 0.06 : 0.055) * (coarse ? 1.3 : 1)); m.userData.k = k;
  brain.add(m);
  const lab = document.createElement('button'); lab.className = 'b3-lab'; lab.textContent = r.n; lab.tabIndex = -1;
  lab.onclick = () => A.openRegion(k);
  labels.appendChild(lab);
  markers[k] = { m, lab, deep, base: m.scale.x };
}

// state
let hot = null, sel = [], selColor = 0xb8321f;
const pv = new THREE.Vector3();
function pick(e) {   // nearest visible marker on screen, within a finger-sized radius on touch
  const b = canvas.getBoundingClientRect(), R = e.pointerType === 'mouse' ? 16 : 30, camDir = camera.position.clone().normalize();
  let best = null, bestD = R;
  for (const k in markers) {
    const o = markers[k]; if (o.deep && !sel.includes(k)) continue;
    o.m.getWorldPosition(pv); if (!o.deep && pv.clone().normalize().dot(camDir) < -0.1) continue;
    pv.project(camera);
    const d = Math.hypot((pv.x * 0.5 + 0.5) * b.width - (e.clientX - b.left), (-pv.y * 0.5 + 0.5) * b.height - (e.clientY - b.top));
    if (d < bestD) { bestD = d; best = k; }
  }
  return best;
}
canvas.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  const k = pick(e); if (k === hot) return; hot = k;
  canvas.style.cursor = k ? 'pointer' : 'grab';
  showInfo(k || sel[0] || null);
});
let down = null;
canvas.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; if (controls.enabled) controls.autoRotate = false; });
canvas.addEventListener('pointerup', e => {
  if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 5) return;
  const k = pick(e); if (k) { focusRegions([k], 0xb8321f); A.openRegion(k); }
});

function showInfo(k) {
  if (!k) {
    const tip = !coarse ? 'Drag to turn · scroll to zoom · click a marked region'
      : controls.enabled ? 'Drag to turn · pinch to zoom · tap a marked region' : 'Tap a marked region · or tap “Explore” to turn it';
    info.innerHTML = `<span class="cap">${tip}</span>`; return;
  }
  const n = A.items.filter(o => o.regs.includes(k)).length;
  info.innerHTML = `<b>${A.REG[k].n}</b><span>${A.REGINFO[k]} · ${n} linked condition${n === 1 ? '' : 's'}</span>`;
}
showInfo(null);

// fly the camera round to face the selected regions
let fly = null;
function focusRegions(regs, color) {
  sel = regs; selColor = color; controls.autoRotate = false;
  const c = new THREE.Vector3(); regs.forEach(k => c.add(markers[k].m.position)); c.divideScalar(regs.length);
  const dir = new THREE.Vector3(Math.min(c.x, 0) - 0.9, c.y * 0.5 + 0.2, c.z * 0.8).normalize();
  const dist = camera.position.distanceTo(controls.target);
  fly = { from: camera.position.clone(), to: dir.multiplyScalar(Math.max(dist, 4.6)), t: 0 };
  showInfo(regs[0]);
}
window.brain3d = {
  ready: true,
  pause() { if (running) { renderer.setAnimationLoop(null); running = false; } },
  resume() { if (!running) { renderer.setAnimationLoop(loop); running = true; } },
  show(regs, colorHex) {
    this.resume();
    document.getElementById('brain3d').scrollIntoView({ behavior: 'smooth', block: 'center' });
    focusRegions(regs, new THREE.Color(colorHex).getHex());
  }
};
document.getElementById('b3-reset').onclick = () => { sel = []; showInfo(null); controls.autoRotate = true; fly = { from: camera.position.clone(), to: new THREE.Vector3(-5.1, 0.9, -1.4), t: 0 }; };

function resize() {
  const w = box.clientWidth, h = box.clientHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h;
  camera.zoom = Math.min(1, camera.aspect / 1.35);   // keep the whole brain in frame on narrow screens
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(box); resize();

const v = new THREE.Vector3(), clock = new THREE.Clock();
let visible = true, running = true;
new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);
function loop() {
  if (!visible) return;
  const t = clock.getElapsedTime();
  if (fly) { fly.t = Math.min(1, fly.t + 0.025); const s = fly.t * fly.t * (3 - 2 * fly.t);
    camera.position.lerpVectors(fly.from, fly.to, s); if (fly.t === 1) fly = null; }
  controls.update();
  const w = box.clientWidth, h = box.clientHeight, camDir = camera.position.clone().normalize();
  for (const k in markers) {
    const o = markers[k], on = sel.includes(k) || k === hot;
    o.m.material.color.setHex(on && sel.includes(k) ? selColor : 0xb8321f);
    o.m.material.opacity = on ? 0.95 : (o.deep ? 0 : 0.32);
    o.m.scale.setScalar(o.base * (on ? 1.9 + 0.3 * Math.sin(t * 4) : 1));
    // label: only for hovered/selected, hidden when on the far side
    o.m.getWorldPosition(v);
    const facing = o.deep || v.clone().normalize().dot(camDir) > -0.1;
    v.project(camera);
    const showLab = on && facing;
    o.lab.style.opacity = showLab ? 1 : 0;
    o.lab.style.pointerEvents = showLab ? 'auto' : 'none';
    o.lab.style.transform = `translate(${(v.x * 0.5 + 0.5) * w}px, ${(-v.y * 0.5 + 0.5) * h}px) translate(-50%, -150%)`;
  }
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(loop);
setExplore(!coarse);
