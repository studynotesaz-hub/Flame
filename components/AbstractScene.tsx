import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const LiquidObsidian = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Create a slow, heavy liquid movement
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere args={[1, 64, 64]} scale={2.4} ref={meshRef}>
        <MeshDistortMaterial
          color="#050505"
          attach="material"
          distort={0.6}
          speed={1.5}
          roughness={0.1}
          metalness={1}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
};

export const AbstractScene: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 30 }}>
        {/* Cinematic lighting setup for dark liquid */}
        <ambientLight intensity={0.5} />
        
        {/* Main rim light */}
        <spotLight position={[10, 10, 5]} intensity={5} angle={0.5} penumbra={1} color="#ffffff" />
        
        {/* Aggressive Flame Accent Light */}
        <pointLight position={[-10, -5, -5]} intensity={8} color="#cd3815" distance={15} />
        
        {/* Fill light */}
        <rectAreaLight width={10} height={10} position={[0, 0, 10]} intensity={1} color="#111111" />
        
        <Environment preset="night" />
        <LiquidObsidian />
      </Canvas>
    </div>
  );
};