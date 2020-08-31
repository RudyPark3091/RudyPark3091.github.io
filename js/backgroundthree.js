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
  cam.position.set(0, 10, 10);

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
  verticeArray.push(new THREE.Vector3(1, 1, 0));
  verticeArray.push(new THREE.Vector3(0, 1, -1));
  verticeArray.push(new THREE.Vector3(-1, 1, 0));
  verticeArray.push(new THREE.Vector3(0, 1, 1));
  verticeArray.push(new THREE.Vector3(1, 1, 0));

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

  // meshes
  const vertices = pushVertices();
  const geo = new THREE.BufferGeometry().setFromPoints(vertices);
  let plane2 = new THREE.Line(
    geo,
    new THREE.LineBasicMaterial({ color: 0xff0000 })
  );
  scene.add(plane2);

  const bgLoad = setInterval(() => {
    vertices.forEach((vertex) => {
      if (vertex.x <= 800) {
        vertex.x *= 1.1;
        vertex.z *= 1.1;
      } else {
        clearInterval(bgLoad);
      }
    });
  
    const geo = new THREE.BufferGeometry().setFromPoints(vertices);
    let plane2 = new THREE.Line(
      geo,
      new THREE.LineBasicMaterial({ color: 0xff0000 })
    );
    scene.add(plane2);
  }, 50);

  // rendering
  document.querySelector("#canvas").appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.render(scene, camera);

  window.onresize = (event) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };


  // animate function
  function animate() {
    requestAnimationFrame(animate);
    render();
  }
  function render() {
    renderer.render(scene, camera);
  }

  animate();
}

init();
