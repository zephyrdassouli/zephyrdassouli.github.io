'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';

export default function AsciiHomeAnimation() {
  const containerRef = useRef(null);
  const effectRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const mouse = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster()).current;
  const planeRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Scene and Camera Initialization
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(150, -100, 300);
    cameraRef.current = camera;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Wave Plane
    const planeGeometry = new THREE.PlaneGeometry(3000, 600, 300, 60);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    planeRef.current = plane;

    const originalPositions = new Float32Array(plane.geometry.attributes.position.array);
    const vertices = plane.geometry.attributes.position.array;
    plane.geometry.computeVertexNormals();

    // Renderer Initialization
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // ASCII Effect
    const effect = new AsciiEffect(renderer, ' %$@#*', { invert: true });
    effect.setSize(window.innerWidth, window.innerHeight);
    effectRef.current = effect;

    // Append to DOM
    if (containerRef.current) {
      containerRef.current.appendChild(effect.domElement);
    }

    // Mouse Event Handler
    const onMouseMove = (event) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    const start = Date.now();
    const animate = () => {
      const timer = Date.now() - start;

      // Raycaster for mouse interaction
      raycaster.setFromCamera(mouse.current, camera);
      const intersects = raycaster.intersectObject(plane);
      let mouseWorldPos = null;
      if (intersects.length > 0) {
        mouseWorldPos = intersects[0].point;
      }

      // Update vertices based on wave and mouse influence
      for (let i = 0; i < vertices.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const baseWave = Math.sin(x * 0.04 + timer * 0.001) * 80 + Math.cos(y * 0.04 + timer * 0.0015) * 80;

        let influence = 0;
        if (mouseWorldPos) {
          const dx = x - mouseWorldPos.x;
          const dy = y - mouseWorldPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const noise = Math.random() * 50 - 25;
            influence = Math.exp(-distance * 0.02) * 100 + noise;
          }
        }

        vertices[i + 1] = baseWave + influence;
      }

      plane.geometry.attributes.position.needsUpdate = true;
      plane.geometry.computeVertexNormals();

      camera.lookAt(scene.position);
      effect.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate); // Store the frame ID
    };
    animate();

    // Resize Handler
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      effect.setSize(width, height);
      plane.position.set(0, 0, 0);
    };
    window.addEventListener('resize', onWindowResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationFrameRef.current); // Cancel the animation frame
      renderer.forceContextLoss();
      renderer.dispose();
      plane.geometry.dispose();
      plane.material.dispose();
      effectRef.current.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    />
  );
}
