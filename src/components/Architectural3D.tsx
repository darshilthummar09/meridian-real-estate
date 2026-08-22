import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCcw, Sparkles, Box, Compass, Layers } from 'lucide-react';

interface Architectural3DProps {
  interactive?: boolean;
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

export default function Architectural3D({ interactive = true }: Architectural3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe' | 'golden'>('solid');
  const [isRotating, setIsRotating] = useState(true);
  const [hasWebGLError, setHasWebGLError] = useState<boolean>(!isWebGLAvailable());

  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    buildingGroup: THREE.Group;
    sunLight: THREE.DirectionalLight;
    ambientLight: THREE.AmbientLight;
    materials: {
      stone: THREE.MeshStandardMaterial;
      glass: THREE.MeshPhysicalMaterial;
      bronze: THREE.MeshStandardMaterial;
      wireframe: THREE.MeshBasicMaterial;
      water: THREE.MeshStandardMaterial;
    };
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (!isWebGLAvailable()) {
      setHasWebGLError(true);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 480;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const domElement = renderer.domElement;
      domElement.addEventListener(
        'webglcontextlost',
        (event) => {
          event.preventDefault();
          setHasWebGLError(true);
        },
        false
      );

      container.appendChild(domElement);
    } catch (e) {
      console.warn('WebGL Context creation failed. Falling back to architectural graphic view.', e);
      setHasWebGLError(true);
      return;
    }

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0c0b);

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(9, 7, 11);
    camera.lookAt(0, 1.2, 0);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 2.2);
    sunLight.position.set(12, 18, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 512;
    sunLight.shadow.mapSize.height = 512;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x4a6582, 0.9);
    fillLight.position.set(-10, 8, -8);
    scene.add(fillLight);

    // Building Materials
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x363430,
      roughness: 0.75,
      metalness: 0.15,
    });

    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      roughness: 0.35,
      metalness: 0.8,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x6894b8,
      transparent: true,
      opacity: 0.55,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.85,
      ior: 1.45,
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xc5a059,
      wireframe: true,
    });

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x1f465c,
      roughness: 0.15,
      metalness: 0.85,
    });

    const materials = {
      stone: stoneMat,
      glass: glassMat,
      bronze: bronzeMat,
      wireframe: wireframeMat,
      water: waterMat,
    };

    // Building Group
    const buildingGroup = new THREE.Group();

    // Ground Platform
    const groundGeo = new THREE.BoxGeometry(10, 0.3, 8);
    const ground = new THREE.Mesh(groundGeo, new THREE.MeshStandardMaterial({ color: 0x161514, roughness: 0.9 }));
    ground.position.y = -0.15;
    ground.receiveShadow = true;
    buildingGroup.add(ground);

    // Reflection Water Pool
    const poolGeo = new THREE.BoxGeometry(4.5, 0.08, 2.6);
    const pool = new THREE.Mesh(poolGeo, waterMat);
    pool.position.set(1.8, 0.02, 2.2);
    buildingGroup.add(pool);

    // Ground Floor Pavilion
    const slab1Geo = new THREE.BoxGeometry(7, 0.35, 5);
    const slab1 = new THREE.Mesh(slab1Geo, stoneMat);
    slab1.position.set(-0.5, 0.2, 0);
    slab1.castShadow = true;
    slab1.receiveShadow = true;
    buildingGroup.add(slab1);

    // Ground Floor Glass Core
    const glassCoreGeo = new THREE.BoxGeometry(5.2, 2.2, 3.6);
    const glassCore = new THREE.Mesh(glassCoreGeo, glassMat);
    glassCore.position.set(-0.6, 1.45, 0);
    buildingGroup.add(glassCore);

    // Monolithic Stone Core (Shear Wall)
    const shearWallGeo = new THREE.BoxGeometry(1.2, 5.2, 2.8);
    const shearWall = new THREE.Mesh(shearWallGeo, new THREE.MeshStandardMaterial({ color: 0x22211f, roughness: 0.8 }));
    shearWall.position.set(-2.8, 2.6, 0.2);
    shearWall.castShadow = true;
    shearWall.receiveShadow = true;
    buildingGroup.add(shearWall);

    // Cantilevered First Floor Slab
    const slab2Geo = new THREE.BoxGeometry(8, 0.35, 5.5);
    const slab2 = new THREE.Mesh(slab2Geo, stoneMat);
    slab2.position.set(0.6, 2.7, 0.2);
    slab2.castShadow = true;
    slab2.receiveShadow = true;
    buildingGroup.add(slab2);

    // Upper Level Glass Living Pavilion
    const upperGlassGeo = new THREE.BoxGeometry(6.4, 2.0, 4.2);
    const upperGlass = new THREE.Mesh(upperGlassGeo, glassMat);
    upperGlass.position.set(0.8, 3.85, 0.2);
    buildingGroup.add(upperGlass);

    // Roof Floating Canopy
    const roofGeo = new THREE.BoxGeometry(9.2, 0.25, 6.2);
    const roof = new THREE.Mesh(roofGeo, stoneMat);
    roof.position.set(0.8, 5.0, 0.2);
    roof.castShadow = true;
    buildingGroup.add(roof);

    // Slender Bronze Columns
    const colPositions = [
      [3.2, 1.45, 1.6],
      [3.2, 1.45, -1.6],
      [-0.2, 1.45, 1.6],
      [-0.2, 1.45, -1.6],
      [3.8, 3.85, 2.0],
      [3.8, 3.85, -1.6],
      [-1.8, 3.85, 2.0],
      [-1.8, 3.85, -1.6],
    ];

    colPositions.forEach(([x, y, z]) => {
      const colGeo = new THREE.CylinderGeometry(0.06, 0.06, y > 2.5 ? 2.0 : 2.2, 16);
      const col = new THREE.Mesh(colGeo, bronzeMat);
      col.position.set(x, y, z);
      col.castShadow = true;
      buildingGroup.add(col);
    });

    // Vertical Louver Screen
    for (let i = 0; i < 7; i++) {
      const louverGeo = new THREE.BoxGeometry(0.04, 2.0, 0.3);
      const louver = new THREE.Mesh(louverGeo, bronzeMat);
      louver.position.set(1.2 + i * 0.4, 3.85, 2.32);
      louver.rotation.y = 0.35;
      louver.castShadow = true;
      buildingGroup.add(louver);
    }

    scene.add(buildingGroup);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      buildingGroup,
      sunLight,
      ambientLight,
      materials,
    };

    // Animation Loop
    let animationFrameId: number;
    let targetRotationY = 0.4;
    let targetRotationX = 0.05;

    const animate = () => {
      if (buildingGroup) {
        if (isRotating) {
          buildingGroup.rotation.y += 0.003;
        } else {
          buildingGroup.rotation.y += (targetRotationY - buildingGroup.rotation.y) * 0.05;
          buildingGroup.rotation.x += (targetRotationX - buildingGroup.rotation.x) * 0.05;
        }
      }
      try {
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      } catch (err) {
        console.warn('Render loop encountered context loss', err);
        setHasWebGLError(true);
      }
    };

    animate();

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotationY = x * 0.8;
      targetRotationX = y * 0.2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      try {
        renderer?.dispose();
      } catch (e) {
        // ignore
      }
    };
  }, [interactive, isRotating]);

  // Handle Render Mode Change
  const updateRenderMode = (mode: 'solid' | 'wireframe' | 'golden') => {
    setRenderMode(mode);
    if (!sceneRef.current) return;
    const { buildingGroup, sunLight, ambientLight, scene, materials } = sceneRef.current;

    if (mode === 'wireframe') {
      scene.background = new THREE.Color(0x060605);
      buildingGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshBasicMaterial({
            color: 0xc5a059,
            wireframe: true,
          });
        }
      });
      sunLight.intensity = 0;
      ambientLight.intensity = 0.5;
    } else if (mode === 'golden') {
      scene.background = new THREE.Color(0x191410);
      sunLight.color = new THREE.Color(0xffaa55);
      sunLight.position.set(16, 4, 8);
      sunLight.intensity = 3.5;
      ambientLight.color = new THREE.Color(0x664422);
      ambientLight.intensity = 1.0;

      buildingGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.geometry instanceof THREE.BoxGeometry && child.scale.y > 0.5) {
            child.material = materials.stone;
          }
        }
      });
    } else {
      scene.background = new THREE.Color(0x0c0c0b);
      sunLight.color = new THREE.Color(0xffeedd);
      sunLight.position.set(12, 18, 10);
      sunLight.intensity = 2.2;
      ambientLight.color = new THREE.Color(0xfff7ed);
      ambientLight.intensity = 0.9;

      buildingGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.geometry.type === 'CylinderGeometry') {
            child.material = materials.bronze;
          } else {
            child.material = materials.stone;
          }
        }
      });
    }
  };

  return (
    <div className="relative w-full h-[420px] md:h-[540px] bg-[#141413] rounded-sm border border-[#262624] overflow-hidden group">
      {/* 3D Canvas Mount or 2D Architectural Isometric Fallback */}
      {!hasWebGLError ? (
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        <div className="w-full h-full relative flex items-center justify-center p-8 overflow-hidden bg-gradient-to-br from-[#161514] via-[#10100F] to-[#0A0A09]">
          {/* Architectural Grid Background */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#C5A059_1px,transparent_1px),linear-gradient(to_bottom,#C5A059_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          
          {/* High-Fidelity Architectural Schematic Drawing */}
          <div className="relative z-0 max-w-md w-full text-center space-y-4">
            <svg
              viewBox="0 0 500 340"
              className="w-full h-auto drop-shadow-2xl transition-all duration-700"
              style={{
                filter: renderMode === 'wireframe' ? 'drop-shadow(0 0 10px rgba(197,160,89,0.5))' : 'none',
              }}
            >
              {/* Ground & Reflection Water */}
              <polygon points="40,240 260,310 460,240 240,170" fill={renderMode === 'golden' ? '#78350F' : '#1E293B'} opacity="0.6" />
              <polygon points="120,240 240,278 360,240 240,202" fill={renderMode === 'golden' ? '#D97706' : '#0369A1'} opacity="0.7" />
              
              {/* Lower Foundation Slab */}
              <polygon points="70,220 250,275 430,220 250,165" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
              
              {/* Ground Glass Core */}
              <polygon points="120,180 250,220 380,180 250,140" fill={renderMode === 'wireframe' ? 'none' : '#0284C7'} opacity="0.3" stroke="#38BDF8" strokeWidth="1.2" />
              <line x1="120" y1="180" x2="120" y2="220" stroke="#38BDF8" strokeWidth="1.2" />
              <line x1="250" y1="220" x2="250" y2="260" stroke="#38BDF8" strokeWidth="1.2" />
              <line x1="380" y1="180" x2="380" y2="220" stroke="#38BDF8" strokeWidth="1.2" />

              {/* Cantilevered Intermediate Floor */}
              <polygon points="50,150 250,210 450,150 250,90" fill="#1E293B" stroke="#64748B" strokeWidth="2" />

              {/* Upper Glass Pavilion & Louvers */}
              <polygon points="100,100 250,145 400,100 250,55" fill={renderMode === 'wireframe' ? 'none' : '#0369A1'} opacity="0.4" stroke="#38BDF8" strokeWidth="1.5" />
              <line x1="100" y1="100" x2="100" y2="150" stroke="#64748B" strokeWidth="1.5" />
              <line x1="250" y1="145" x2="250" y2="195" stroke="#64748B" strokeWidth="1.5" />
              <line x1="400" y1="100" x2="400" y2="150" stroke="#64748B" strokeWidth="1.5" />

              {/* Cantilever Overhang Roof */}
              <polygon points="30,70 250,135 470,70 250,5" fill={renderMode === 'golden' ? '#92400E' : '#334155'} stroke="#94A3B8" strokeWidth="2.5" />

              {/* Bronze Louvers */}
              {[140, 165, 190, 215, 270, 295, 320, 345].map((x, i) => (
                <line
                  key={i}
                  x1={x}
                  y1={x < 250 ? 112 + (x - 140) * 0.3 : 145 - (x - 250) * 0.3}
                  x2={x}
                  y2={x < 250 ? 160 + (x - 140) * 0.3 : 193 - (x - 250) * 0.3}
                  stroke="#C5A059"
                  strokeWidth="2.5"
                />
              ))}
            </svg>

            <div className="space-y-1">
              <div className="text-xs font-mono tracking-widest text-[#C5A059] uppercase font-bold">
                Isometric Massing Projection · Villa Volumetric Schema
              </div>
              <p className="text-[11px] font-sans text-[#9B978F]">
                270° Dual-Aspect Cantilevers with Integrated Passive Thermal Shading
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Control Overlay */}
      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
        <div className="bg-[#0C0C0B]/90 backdrop-blur-md px-3 py-1.5 border border-[#262624] text-[11px] uppercase tracking-widest font-sans font-medium text-[#F3F0EA] flex items-center gap-2 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span>Interactive Massing Pavilion</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 z-10 pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-[#0C0C0B]/90 backdrop-blur-md p-1 border border-[#262624]">
          <button
            onClick={() => updateRenderMode('solid')}
            className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-sans transition-colors cursor-pointer ${
              renderMode === 'solid' ? 'bg-[#C5A059] text-[#0C0C0B] font-semibold' : 'text-[#9B978F] hover:text-[#F3F0EA]'
            }`}
          >
            <span className="flex items-center gap-1.5"><Box className="w-3 h-3" /> Basalt</span>
          </button>
          <button
            onClick={() => updateRenderMode('wireframe')}
            className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-sans transition-colors cursor-pointer ${
              renderMode === 'wireframe' ? 'bg-[#C5A059] text-[#0C0C0B] font-semibold' : 'text-[#9B978F] hover:text-[#F3F0EA]'
            }`}
          >
            <span className="flex items-center gap-1.5"><Eye className="w-3 h-3" /> Blueprint</span>
          </button>
          <button
            onClick={() => updateRenderMode('golden')}
            className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-sans transition-colors cursor-pointer ${
              renderMode === 'golden' ? 'bg-[#C5A059] text-[#0C0C0B] font-semibold' : 'text-[#9B978F] hover:text-[#F3F0EA]'
            }`}
          >
            <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> Sunset Sim</span>
          </button>
        </div>

        {!hasWebGLError && (
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center gap-1.5 bg-[#0C0C0B]/90 backdrop-blur-md px-3 py-1.5 border border-[#262624] text-[11px] font-sans uppercase tracking-widest text-[#9B978F] hover:text-[#F3F0EA] transition-colors cursor-pointer"
          >
            <RotateCcw className={`w-3 h-3 ${isRotating ? 'animate-spin text-[#C5A059]' : ''}`} />
            <span>{isRotating ? 'Auto Orbit' : 'Free Look'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
