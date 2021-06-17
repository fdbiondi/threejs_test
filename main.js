import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Torus
const geometry = new THREE.TorusGeometry(3, 1, 8, 30);
const material1 = new THREE.MeshStandardMaterial({ color: 0xe9005c });
const material2 = new THREE.MeshStandardMaterial({ color: 0xf3448b });
const material3 = new THREE.MeshStandardMaterial({ color: 0x9c9aa3 });
const torus = new THREE.Mesh(geometry, material1);
const torus2 = new THREE.Mesh(geometry, material2);
const torus3 = new THREE.Mesh(geometry, material3);

scene.add(torus);
scene.add(torus2);
scene.add(torus3);

// Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// Helpers
//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

// Camera movement
const controls = new OrbitControls(camera, renderer.domElement)

// Add stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 15, 15);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(500).fill().forEach(addStar);

// Textures
//const spaceTexture = new THREE.TextureLoader().load('space.jpg');
//scene.background = spaceTexture

const polluxTexture = new THREE.TextureLoader().load('pollux_texture.jpg');
const polluxNormalTexture = new THREE.TextureLoader().load('pollux_normal_map.jpg');
const pollux = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: polluxTexture,
    normalMap: polluxNormalTexture
  })
);

scene.add(pollux);

pollux.position.setX(-20);
pollux.position.setZ(20);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = 30 + (t * -0.01);
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

let moverX = 0.08;
let moverY = 0.02;

let mover2X = 0.04;
let mover2Y = -0.04;

let mover3X = -0.12;
let mover3Y = -0.06;

// Animation
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.03;
  torus.rotation.z += 0.005;

  torus2.rotation.x += 0.01;
  torus2.rotation.y += 0.007;
  torus2.rotation.z += 0.009;

  torus3.rotation.x += 0.01;
  torus3.rotation.y += 0.007;
  torus3.rotation.z += 0.009;

  torus.position.x += moverX;
  torus.position.y += moverY;
  torus2.position.x += mover2X;
  torus2.position.y += mover2Y;
  torus3.position.x += mover3X;
  torus3.position.y += mover3Y;

  if (torus.position.x >= 50 || torus.position.x < -50) {
    moverX = -1 * moverX;
  }

  if (torus.position.y >= 20 || torus.position.y < -20) {
    moverY = -1 * moverY;
  }

  if (torus2.position.x >= 50 || torus2.position.x < -50) {
    mover2X = -1 * mover2X;
  }

  if (torus2.position.y >= 20 || torus2.position.y < -20) {
    mover2Y = -1 * mover2Y;
  }

  if (torus3.position.x >= 50 || torus3.position.x < -50) {
    mover3X = -1 * mover3X;
  }

  if (torus3.position.y >= 20 || torus3.position.y < -20) {
    mover3Y = -1 * mover3Y;
  }

  /*pollux.rotation.x += 0.0001;
  pollux.rotation.y += 0.003;
  pollux.rotation.z += 0.01;*/

  controls.update();

  renderer.render(scene, camera);
}

animate();
