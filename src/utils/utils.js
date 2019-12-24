import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  Geometry,
  AxesHelper,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  Vector3,
  Face3
} from 'three';

const createButterfly = () => {
  const geometry = new Geometry();
  geometry.vertices.push(new Vector3(0, 0, 0));
  geometry.vertices.push(new Vector3(5, 0, 0));
  geometry.vertices.push(new Vector3(2, 4, 3));
  geometry.vertices.push(new Vector3(2, 4, -3));

  const material = new MeshBasicMaterial({ color: 0xff4606, side: DoubleSide });
  const butterfly = new Mesh(geometry, material);

  geometry.faces.push(new Face3(0, 1, 2));
  geometry.faces.push(new Face3(0, 1, 3));

  butterfly.rotation.z = 0.7;
  butterfly.rotation.x = 0.6;

  return butterfly;
};

const addAxis = (scene) => {
  scene.add(new AxesHelper(5));
};

const init = (butterfly) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0xffffff);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.z = 40;
  scene.add(butterfly);
  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return {
    renderer,
    scene,
    camera
  };
};

export { init, createButterfly, addAxis };
