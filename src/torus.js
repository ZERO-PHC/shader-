import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame,} from 'react-three-fiber'


function IridescentTorus() {
  // Create a ref for the iridescent material's time uniform
  const time = useRef(0);
  const meshRef = useRef();

  // Update the time uniform in the animation loop
  useFrame(() => {
    time.current += 0.01;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} scale={0.5}>
      <torusGeometry attach="geometry" args={[5, 2, 16, 100]} />
      <shaderMaterial
        attach="material"
        uniforms={{ time: { value: time.current } }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          varying vec2 vUv;
          void main() {
            vec3 color = vec3(sin(time + vUv.x * 10.0), sin(time + vUv.y * 10.0), sin(time + vUv.x * vUv.y * 10.0));
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}



