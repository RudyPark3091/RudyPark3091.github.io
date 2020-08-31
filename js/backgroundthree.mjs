import * as THREE from "https://rudypark3091.github.io/js/three.js-dev/build/three.min.js";
import { OrbitControls } from "https://rudypark3091.github.io/js/three.js-dev/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "https://rudypark3091.github.io/js/three.js-dev/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://rudypark3091.github.io/js/three.js-devr115/examples/jsm/postprocessing/RenderPass.js";
import { GlitchPass } from "https://rudypark3091.github.io/js/three.js-devr115/examples/jsm/postprocessing/GlitchPass.js";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

function initScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  return scene;
}

function initLight() {
  const light = new THREE.AmbientLight(0xaaaaaa);

  return light;
}

function initCamera() {
  const frustumSize = 10;
  const aspect = WIDTH / HEIGHT;
  const cam = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 1000);
  //const cam = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, .1, 1000);
  cam.position.set(20, 10, 10);

  return cam;
}

function initRenderer() {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.domElement.className = "canvas";

  return renderer;
}

function pushVertices() {
  const verticeArray = [];
  verticeArray.push(new THREE.Vector3(0.1, 1, 0));
  verticeArray.push(new THREE.Vector3(0, 1, -0.1));
  verticeArray.push(new THREE.Vector3(-0.1, 1, 0));
  verticeArray.push(new THREE.Vector3(0, 1, 0.1));
  verticeArray.push(new THREE.Vector3(0.1, 1, 0));

  return verticeArray;
}

function setGeometry(vertices) {
  const geometry = new THREE.Geometry();
  vertices.forEach((vertex) => {
    geometry.vertices.push(vertex);
  });
  geometry.faces.push(new THREE.Face3(0, 1, 2));
  geometry.faces.push(new THREE.Face3(0, 1, 3));
  geometry.faces.push(new THREE.Face3(0, 2, 4));
  geometry.faces.push(new THREE.Face3(0, 3, 4));
  return geometry;
}

function setRedBasicMat() {
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide
  });
  return material;
}

function init() {
  // initializing vital components
  const scene = initScene();
  const light = initLight();
  const camera = initCamera();
  const renderer = initRenderer();
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;

  // meshes
  const vertices = pushVertices();
  const geo = new THREE.BufferGeometry().setFromPoints(vertices);
  let plane2 = new THREE.Line(
    geo,
    new THREE.LineBasicMaterial({ color: 0xff0000 })
  );
  scene.add(plane2);

  setInterval(() => {
    vertices.forEach((vertex) => {
      vertex.x *= 1.1;
      vertex.z *= 1.1;
    });
    const geo = new THREE.BufferGeometry().setFromPoints(vertices);
    let plane2 = new THREE.Line(
      geo,
      new THREE.LineBasicMaterial({ color: 0xff0000 })
    );
    scene.add(plane2);
  }, 2000);

  // rendering
  document.querySelector("#canvas").appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.render(scene, camera);

  window.onresize = (event) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // postprocessing
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const glitchPass = new GlitchPass();
  composer.addPass(glitchPass);

  // animate function
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
  }
  function render() {
    composer.render(scene, camera);
  }

  animate();
}

init();
