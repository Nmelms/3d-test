"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Model() {
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add your model loading and other Three.js logic here

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0); // Set the position of the target the camera looks at
    controls.update();

    // Handle window resize
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    const mtlLoader = new MTLLoader();
    mtlLoader.load("/Cubone/materials.mtl", (materials) => {
      materials.preload();

      // Then, load the model
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials); // Set the materials to be used by the OBJLoader
      objLoader.load("/Cubone/model.obj", (object) => {
        // Add the object to your scene
        scene.add(object);
      });
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Bright white light
    scene.add(ambientLight);

    camera.position.set(2, 2, 0);
    camera.lookAt(scene.position);
    const gridHelper = new THREE.GridHelper(10, 10);
  }, []);

  return null;
}

export default Model;
