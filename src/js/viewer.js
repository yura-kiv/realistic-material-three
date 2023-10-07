import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default class Viewer {
  constructor() {
    this.createResize();
    this.camera = this.createCamera();
    this.scene = this.createScene();
    this.renderer = this.createRenderer();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.createLight(this.scene);
    this.update(this.camera, this.scene, this.renderer);
  }

  updateActionsPool = {};
  resizeActionsPool = {};

  createCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 25);
    camera.position.z = 5;
    camera.position.y = 5;

    this.addResizeAction("resize_camera", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    return camera;
  }

  createScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  createRenderer() {
    if (this.renderer) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      pixelRatio: window.devicePixelRatio,
    });
    renderer.setClearColor(0xfaf0e6);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    this.addResizeAction("resize_renderer", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return renderer;
  }

  createLight(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 20, 20);
    pointLight.position.set(0, 5, 2);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.camera.near = 1;
    pointLight.shadow.camera.far = 20;
    scene.add(pointLight);
    scene.add(ambientLight);
  }

  addUpdateAction(name, action) {
    this.updateActionsPool[name] = action;
  }

  removeUpdateAction(name) {
    delete this.updateActionsPool[name];
  }

  createResize() {
    window.addEventListener("resize", () => {
      for (var key in this.resizeActionsPool) this.resizeActionsPool[key]();
    });
  }

  addResizeAction(name, action) {
    this.resizeActionsPool[name] = action;
  }

  removeResizeAction(name) {
    delete this.resizePool[name];
  }

  update(camera, scene, renderer) {
    renderer.render(scene, camera);
    for (const key in this.updateActionsPool) this.updateActionsPool[key]();
    requestAnimationFrame(() => this.update(camera, scene, renderer));
  }
}
