import * as THREE from "three";
import TextureDiff from "/textures/aerial_rocks_02_diff_1k.jpg"; // texture for filling object
import TextureDisp from "/textures/aerial_rocks_02_disp_1k.jpg"; // texture for displacement map of the object
import TextureNor from "/textures/aerial_rocks_02_nor_gl_1k.jpg"; // for full use of lighting
import TextureArm from "/textures/aerial_rocks_02_arm_1k.jpg";
// ARM: Ambient Occlusion - adds for better contrast (false shades)
// Roughness - Black means that the surface is rough, white means that it is smooth
// Metalness

const textureDiff = new THREE.TextureLoader().load(TextureDiff);
const textureDisp = new THREE.TextureLoader().load(TextureDisp);
const textureNor = new THREE.TextureLoader().load(TextureNor);
const textureArm = new THREE.TextureLoader().load(TextureArm);

export const getPlane = (viewer) => {
  const geometry = new THREE.PlaneGeometry(10, 10, 50, 50);
  const material = new THREE.MeshStandardMaterial({
    map: textureDiff,
    displacementMap: textureDisp,
    aoMap: textureArm,
    roughnessMap: textureArm,
    metalnessMap: textureArm,
    normalMap: textureNor,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotateX(-Math.PI / 2);
  plane.position.set(0, -2, 0);
  plane.receiveShadow = true;
  viewer.scene.add(plane);
};

export const getSphere = (viewer) => {
  const geometry = new THREE.IcosahedronGeometry(1.5, 50);
  const material = new THREE.MeshStandardMaterial({
    map: textureDiff,
    displacementMap: textureDisp,
    displacementScale: 0.6,
    aoMap: textureArm,
    roughnessMap: textureArm,
    metalnessMap: textureArm,
    normalMap: textureNor,
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, 2, 0);
  sphere.castShadow = true;
  viewer.scene.add(sphere);
  viewer.addUpdateAction("sphere_rotation", () => {
    sphere.rotateZ(0.005);
    sphere.rotateY(0.005);
  });
};
