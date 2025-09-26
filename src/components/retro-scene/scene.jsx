import { OrbitControls, OrthographicCamera, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { wrapEffect, EffectComposer, Bloom } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import * as THREE from "three";
import { stringify, parse } from "flatted";

import fragmentShader from "./fragment-shader.glsl";
import "./scene.css";

const originalStringify = JSON.stringify;
JSON.stringify = function (value, replacer, space) {
  try {
    return originalStringify(value, replacer, space);
  } catch (error) {
    if (error.message.includes("circular structure")) {
      console.warn("Prevented circular structure serialization");
      return "[Circular Structure]";
    }
    throw error;
  }
};

if (typeof window !== "undefined") {
  const originalConsoleError = console.error;
  console.error = function (...args) {
    const message = args[0];
    if (typeof message === "string" && message.includes("circular structure")) {
      console.warn("Circular structure error caught and suppressed");
      return;
    }
    return originalConsoleError.apply(console, args);
  };
}

// Error Boundary Component for React Three Fiber
class RetroSceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("RetroScene Error Boundary caught an error:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

const safeStringify = (obj) => {
  try {
    return stringify(obj);
  } catch (error) {
    console.warn("Failed to serialize object:", error);
    return null;
  }
};

const safeParse = (str) => {
  try {
    return parse(str);
  } catch (error) {
    console.warn("Failed to parse JSON:", error);
    return null;
  }
};

class RetroEffectImpl extends Effect {
  constructor() {
    const uniforms = new Map([
      ["colorNum", new THREE.Uniform(8.0)],
      ["pixelSize", new THREE.Uniform(2.0)],
      ["blending", new THREE.Uniform(true)],
      ["curve", new THREE.Uniform(0.25)],
    ]);

    super("RetroEffect", fragmentShader, {
      uniforms,
    });

    this.uniforms = uniforms;
  }

  set blending(value) {
    this.uniforms.get("blending").value = value;
  }

  get blending() {
    return this.uniforms.get("blending").value;
  }

  set curve(value) {
    this.uniforms.get("curve").value = value;
  }

  get curve() {
    return this.uniforms.get("curve").value;
  }

  set colorNum(value) {
    this.uniforms.get("colorNum").value = value;
  }

  get colorNum() {
    return this.uniforms.get("colorNum").value;
  }

  set pixelSize(value) {
    this.uniforms.get("pixelSize").value = value;
  }

  get pixelSize() {
    return this.uniforms.get("pixelSize").value;
  }
}

const RetroEffect = wrapEffect(RetroEffectImpl);

const Spaceship = forwardRef((_, ref) => {
  // Original model by Sousinho
  // Their work: https://sketchfab.com/sousinho
  // The original model: https://sketchfab.com/3d-models/rusty-spaceship-orange-18541ebed6ce44a9923f9b8dc30d87f5
  const gltf = useGLTF(
    "https://cdn.maximeheckel.com/models/spaceship-optimized.glb",
  );

  useEffect(() => {
    if (gltf) {
      try {
        function alphaFix(material) {
          material.transparent = true;
          material.alphaToCoverage = true;
          material.depthFunc = THREE.LessEqualDepth;
          material.depthTest = true;
          material.depthWrite = true;
        }
        alphaFix(gltf.materials.spaceship_racer);
        alphaFix(gltf.materials.cockpit);

        if (process.env.NODE_ENV === "development") {
          console.log("Materials loaded successfully");
        }
      } catch (error) {
        console.warn("Error setting up materials:", error.message);
      }
    }
  }, [gltf]);

  return (
    <group ref={ref}>
      <group
        scale={0.005}
        rotation={[0, -Math.PI * 0.5, 0]}
        position={[1.583, 0, -3.725]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={gltf.nodes.Cube001_spaceship_racer_0.geometry}
          material={gltf.materials.spaceship_racer}
          position={[739.26, -64.81, 64.77]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={gltf.nodes.Cube005_cockpit_0.geometry}
          material={gltf.materials.spaceship_racer}
          position={[739.26, 0, 0]}
        />
      </group>
    </group>
  );
});

const Retro = () => {
  const spaceship = useRef();
  const effect = useRef();

  const colorNum = "16.0";
  const pixelSize = "4.0";

  useFrame((state) => {
    const { camera, clock } = state;

    try {
      effect.current.colorNum = parseInt(colorNum, 10);
      effect.current.pixelSize = parseInt(pixelSize, 10);

      spaceship.current.rotation.x =
        Math.cos(state.clock.getElapsedTime()) *
        Math.cos(state.clock.getElapsedTime()) *
        0.15;
      spaceship.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 1.0) + 0.5;

      camera.lookAt(0, 0, 0);
    } catch (error) {
      console.warn("Animation error:", error.message);
    }
  });

  return (
    <>
      <group rotation={[0, Math.PI / 2, 0]}>
        <Spaceship ref={spaceship} />
      </group>
      <EffectComposer>
        <RetroEffect ref={effect} />
        <Bloom
          intensity={0.25}
          luminanceThreshold={0.05}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
};

const Scene = () => {
  return (
    <RetroSceneErrorBoundary>
      <Canvas
        shadows
        dpr={[1, 2]}
        onError={(error) => {
          console.warn(
            "Canvas error:",
            error?.message || "Unknown canvas error",
          );
        }}
        onCreated={({ gl, scene, camera }) => {
          try {
            const safeToJSON = () => "[Three.js Object - Not Serializable]";

            if (gl && !gl.toJSON) {
              Object.defineProperty(gl, "toJSON", {
                value: safeToJSON,
                writable: false,
              });
            }
            if (scene && !scene.toJSON) {
              Object.defineProperty(scene, "toJSON", {
                value: safeToJSON,
                writable: false,
              });
            }
            if (camera && !camera.toJSON) {
              Object.defineProperty(camera, "toJSON", {
                value: safeToJSON,
                writable: false,
              });
            }

            scene.traverse((child) => {
              if (child && !child.toJSON) {
                try {
                  Object.defineProperty(child, "toJSON", {
                    value: safeToJSON,
                    writable: false,
                  });
                } catch (e) {}
              }
            });
          } catch (defineError) {
            console.warn(
              "Could not define toJSON properties:",
              defineError.message,
            );
          }
        }}
      >
        <Suspense fallback="Loading...">
          <color attach="background" args={["#3386E0"]} />
          <ambientLight intensity={0.25} />
          <directionalLight position={[0, 10, 5]} intensity={10.5} />
          <Retro />
          <OrbitControls />
          <OrthographicCamera
            makeDefault
            position={[5, 5, 5]}
            zoom={30}
            near={0.01}
            far={500}
          />
        </Suspense>
      </Canvas>
    </RetroSceneErrorBoundary>
  );
};

export default Scene;
