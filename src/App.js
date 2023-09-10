import React from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Drone } from "./Drone";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Terrain() {
  const mesh = React.useRef();

  return (
    <mesh
      ref={mesh}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, 0]}
      castShadow
      receiveShadow
    >
      <planeGeometry attach='geometry' args={[25, 25, 75, 75]} />
      <meshStandardMaterial
        attach='material'
        color={"lightblue"}
        metalness={0.9} // Adjust metalness for reflection
        roughness={0.05} // Adjust roughness for shininess
      />
    </mesh>
  );
}

function Model() {
  const gltf = useLoader(
    GLTFLoader,
    "obj.glb"
    // "https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@glTFLoader/public/models/monkey.glb"
  );

  return <primitive object={gltf.scene} />;
}

function Object({ position }) {
  const mesh = React.useRef();
  const camera = React.useRef();

  useFrame((state) => {
    state.camera.position.lerp(
      new THREE.Vector3().set(position[0], position[1], position[2]),
      0.1
    );
    state.camera.lookAt(mesh.current.position);
    state.camera.updateProjectionMatrix();
  });

  return (
    <>
      <OrbitControls target={[0, 0, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera
        ref={camera}
        makeDefault
        fov={55}
        position={[0, 0,2]}
      />
      {/* <Drone mesh={mesh} /> */}
      <mesh ref={mesh} position={[0, 0, 0]} castShadow receiveShadow>
        <Model />
      </mesh>
    </>
  );
}

function App() {
  const [position, setPosition] = React.useState([0, 0, 2]);

  const handleLeftClick = () => {
    // Update the camera's position (rotate 90 degrees to the left)

    setPosition([position[2], position[1], -position[0]]);
    console.log("left", position);
  };

  const handleRightClick = () => {
    // Update the camera's position (rotate 90 degrees to the right)

    setPosition([-position[2], position[1], position[0]]);
    console.log("right", position);
  };

  const handleTopViewClick = () => {
    // Set the camera to top view
    setPosition([0, 3, 0]);
  };

  const handleHorizontalViewClick = () => {
    // Set the camera back to horizontal view
    setPosition([0, 0, 2]);
  };
  return (
    <div id='canvas-container'>
      <button onClick={handleLeftClick}>{`<--`}</button>
      <button onClick={handleRightClick}>{`-->`}</button>
      <button onClick={handleTopViewClick}>TOP</button>
      <button onClick={handleHorizontalViewClick}>Horizont</button>
      <Canvas shadows>
        <ambientLight intensity={2} />
        <pointLight color='white' position={[0, 1, 1]} />

        <Object position={position} />
        <Terrain />
      </Canvas>
    </div>
  );
}

export default App;
