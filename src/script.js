import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener("dblclick", () => {
  let fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitFullscreenElement) {
      canvas.webkitFullscreenElement();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

/* Textures */
// const image = new Image();
// const texture = new THREE.Texture(image);
// texture.colorSpace = THREE.SRGBColorSpace;
// image.onload = () => (texture.needsUpdate = true);
// image.src = "/door.jpg";

const textureLoader = new THREE.TextureLoader();
const doorTexture = textureLoader.load("/textures/checkerboard-8x8.png");
doorTexture.colorSpace = THREE.SRGBColorSpace; //for latest version of THREE.js

const texture = doorTexture;
// texture.repeat.x = 2;
// texture.repeat.y = 2;
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;
// texture.offset.x = 0.5;
// texture.offset.y = 0.5;
// texture.rotation = Math.PI / 4; //in radians
// texture.center.x = 0.5;
// texture.center.y = 0.5;

texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100);
// const geometry = new THREE.SphereGeometry(1, 32,32);
// const geometry = new THREE.ConeGeometry(1, 1,32);
const material = new THREE.MeshBasicMaterial({
  map: texture,
  // color: 0xff0000,
  //   wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  /* Field of view: */ 75,
  /* Aspect Ratio: */ sizes.width / sizes.height,
  /* Near: */ 0.1,
  /* Far: */ 100
);

camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
