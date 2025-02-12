'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';

export default function AsciiWaveAnimation({className, cameraPosition, cameraRotation, distanceValue = 150, blue = false }) {
  const containerRef = useRef(null);
  const effectRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const mouse = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster()).current;
  const planeRef = useRef(null);
  const animationFrameRef = useRef(null);

  const toRadians = (degrees) => degrees * (Math.PI / 180);

  useEffect(() => {
    // Scene and Camera Initialization
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
    if (cameraRotation) {
      camera.rotation.set(toRadians(cameraRotation[0]), toRadians(cameraRotation[1]), toRadians(cameraRotation[2]));
    }

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

    // Ascii Effect
    const effect = new AsciiEffect(renderer, ' %$@#*', { invert: true });
    effect.setSize(window.innerWidth, window.innerHeight);
    if (blue) {
      effect.domElement.style.color = '#003CFF';
      effectRef.current = effect;
    }

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

        // Base wave calculation for both sides of the wave (upper and lower)
        const waveInfluence = Math.sin(x * 0.04 + timer * 0.001) * 80 + Math.cos(y * 0.04 + timer * 0.0015) * 80;

        let influence = 0;
        if (mouseWorldPos) {
          const dx = x - mouseWorldPos.x;
          const dy = y - mouseWorldPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < distanceValue) {
            const noise = Math.random() * 50 - 25;
            influence = Math.exp(-distance * 0.02) * 100 + noise;
          }
        }

        // Apply wave and influence to vertices (both upper and lower sides of the wave)
        vertices[i + 1] = waveInfluence + influence;
        vertices[i + 1] = -waveInfluence + influence; // Apply to the bottom side as well
      }

      plane.geometry.attributes.position.needsUpdate = true;
      plane.geometry.computeVertexNormals();

      if (!cameraRotation) {
        camera.lookAt(scene.position);
      }
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
  }, [cameraPosition, cameraRotation]);

  return (
    <div
      className={className}
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
}
