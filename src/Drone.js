export function Drone({ mesh }) {
  return (
    <group ref={mesh} rotation={[0, Math.PI / 1.34, 0]}>
      <mesh ref={mesh} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.05, 1]} />
        <meshStandardMaterial
          color='hotpink'
          metalness={0.2} // Adjust metalness for reflection
          roughness={0.5} // Adjust roughness for shininess
        />
      </mesh>
      <mesh ref={mesh} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.05, 0.2]} />
        <meshStandardMaterial
          color='red'
          metalness={0.2} // Adjust metalness for reflection
          roughness={0.5} // Adjust roughness for shininess
        />
      </mesh>
      {/* motors */}
      <mesh ref={mesh} position={[0, 0, 0.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 32]} />
        <meshStandardMaterial
          color='yellow'
          metalness={0.2} // Adjust metalness for reflection
          roughness={0.5} // Adjust roughness for shininess
        />
      </mesh>
      <mesh ref={mesh} position={[-0.5, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 32]} />
        <meshStandardMaterial
          color='blue'
          metalness={0.2} // Adjust metalness for reflection
          roughness={0.5} // Adjust roughness for shininess
        />
      </mesh>
      <mesh ref={mesh} position={[0, 0, -0.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 32]} />
        <meshStandardMaterial
          color='blue'
          metalness={0.2} // Adjust metalness for reflection
          roughness={0.5} // Adjust roughness for shininess
        />
      </mesh>
      <mesh ref={mesh} position={[0.5, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 32]} />
        <meshStandardMaterial
          color='yellow'
          metalness={0.2} // Adjust metalness for reflection
          roughness={0.5} // Adjust roughness for shininess
        />
      </mesh>
    </group>
  );
}
