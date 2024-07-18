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

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => console.log("start");
loadingManager.onLoad = () => console.log("load");
loadingManager.onProgress = () => console.log("progress");
loadingManager.onError = () => console.log("error");
const textureLoader = new THREE.TextureLoader(loadingManager);
const doorTexture = textureLoader.load("/door.jpg");
doorTexture.colorSpace = THREE.SRGBColorSpace; //for latest version of THREE.js
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
alphaTexture.colorSpace = THREE.SRGBColorSpace;
const heightTexture = textureLoader.load("/textures/door/height.jpg");
heightTexture.colorSpace = THREE.SRGBColorSpace;
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
metalnessTexture.colorSpace = THREE.SRGBColorSpace;
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
normalTexture.colorSpace = THREE.SRGBColorSpace;
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
roughnessTexture.colorSpace = THREE.SRGBColorSpace;

const texture = roughnessTexture;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
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
