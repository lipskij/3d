import React from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  OrbitControls,
  PerspectiveCamera,
  Reflector,
  useTexture,
} from "@react-three/drei";
import { Drone } from "./Drone";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Terrain() {
  const [floor, normal] = useTexture(["image.jpeg", "nn.jpeg"]);
  return (
    <Reflector
      blur={[400, 100]}
      resolution={512}
      args={[15, 15]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={1.5}
      position={[0, -2, 0]}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    >
      {(Material, props) => (
        <Material
          color='#a0a0a0'
          metalness={0.4}
          normalScale={[2, 2]}
          {...props}
          roughnessMap={floor}
          normalMap={normal}
        />
      )}
    </Reflector>
  );
}

function Wall() {
  const [floor, normal] = useTexture(["image.jpeg", "nn.jpeg"]);
  return (
    <Reflector
      blur={[400, 100]}
      rotation={[-0, 0, 0]}
      resolution={512}
      position={[0, 0, -7]}
      args={[15, 15]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={1.5}
    >
      {(Material, props) => (
        <Material
          color='#fffff7'
          roughnessMap={floor}
          normalMap={normal}
          metalness={0.4}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  );
}

function WallOne() {
  const [floor, normal] = useTexture(["image.jpeg", "nn.jpeg"]);
  return (
    <Reflector
      blur={[400, 100]}
      rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
      resolution={512}
      position={[8, 5, -0.5]}
      args={[15, 15]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={1.5}
    >
      {(Material, props) => (
        <Material
          color='#fffff7'
          roughnessMap={floor}
          normalMap={normal}
          metalness={0.4}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  );
}
function WallTwo() {
  const [floor, normal] = useTexture(["image.jpeg", "nn.jpeg"]);
  return (
    <Reflector
      blur={[400, 100]}
      rotation={[-Math.PI * 2, -Math.PI / -2, 0]}
      position={[-8, 5, -0.5]}
      resolution={512}
      args={[15, 15]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={1.5}
    >
      {(Material, props) => (
        <Material
          color='#pink'
          roughnessMap={floor}
          normalMap={normal}
          metalness={0.4}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
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
        position={[0, 0, 2]}
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
        <ambientLight intensity={0.7} color='white' position={[0,0,0]} />
        <pointLight color='red' position={[0, 1, -2]} intensity={2} />
        <pointLight color='blue' position={[1, -1, -1]} intensity={2} />
        <pointLight color='white' position={[2, 2, 3]} intensity={2} />
        <pointLight color='green' position={[10, -2, -5]} intensity={2} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-6,0,7]} intensity={0.5} />
        <directionalLight position={[6,0,7]} intensity={0.5} />

        <Object position={position} />
        <Wall />
        <WallOne />
        <WallTwo />
        <Terrain />
      </Canvas>
    </div>
  );
}

export default App;
