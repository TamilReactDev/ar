// https://cydstumpel.nl/

import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Environment, useScroll, OrbitControls, Html } from '@react-three/drei'
import { easing } from 'maath'
import './util'


export const Dashboard = () => (
  <Canvas style={{width:'100vw',height:'90vh',overflowX:'hidden'}} camera={{ position: [0, 0,10], fov: 15 }}>
      <Carousel />
    <OrbitControls />
    <Environment preset="city" background />
  </Canvas>
)

function Carousel({ radius = 2, count = 8 }) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={`https://th.bing.com/th/id/R.32eba2621a8450ef9bc716aa1eeb2b08?rik=tU4Jg1wfM%2bbchA&riu=http%3a%2f%2fwww.pastor-dave.com%2fwp-content%2fuploads%2f2014%2f08%2fWedding.jpg&ehk=2FOW1VOWcD9aTa2WMxB%2bI812SrfOZmZJi%2bb82KnPU5g%3d&risl=&pid=ImgRaw&r=0`}
      position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ))
}

function Card({ url, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const pointerOver = (e) => (e.stopPropagation(), hover(true))
  const pointerOut = () => hover(false)
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
    easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
  })
  return (
    <Image  ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>
      <bentPlaneGeometry   args={[0.1, 1, 1, 20, 20]} />
    </Image>
  )
}



