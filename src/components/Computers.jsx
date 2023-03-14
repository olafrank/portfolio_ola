import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, } from '@react-three/drei';
import CanvasLoader from '../wrapper/Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    // when creating 3ds element you start with a mesh and give it a light
    <mesh>
      <hemisphereLight intensity={0.15}
        groundColor='black' />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024} />
      <primitive object={computer.scene}
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile?[0,-3,-2.0]: [0, -3.70, -1.5]}
        rotation={[-0.01, -0.2, -0.1]} />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // add a listener for changes to the screen
    const mediaQuery = window.matchMedia('(max-width:500px)');

   //set the initial value of the ismobile state variable 
    setIsMobile(mediaQuery.matches);

  //  define a callback function to handle cchanges to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    // add the callback function as a listener for changes to  the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      // remove the listener when component unmounted
      mediaQuery.removeEventListener('change', handleMediaQueryChange)

    }
  }, [])



  return (
    <Canvas frameloop='demand'
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2} />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas;