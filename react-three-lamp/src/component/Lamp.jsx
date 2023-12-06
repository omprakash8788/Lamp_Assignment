import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Updated import

const Lamp = ({ isOn }) => {
  const lampRef = useRef();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  useEffect(() => {
    camera.position.z = 5;
    renderer.setSize(window.innerWidth, window.innerHeight);
    lampRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x999999 });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    };

    animate();

    return () => {
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    scene.children[0].material.color.setHex(isOn ? 0xFFFF00 : 0x999999);
  }, [isOn]);

  return <div ref={lampRef}></div>;
};

export default Lamp;
