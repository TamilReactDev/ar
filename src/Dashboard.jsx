// https://cydstumpel.nl/

import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Environment, useScroll, OrbitControls, Html } from '@react-three/drei'
import { easing } from 'maath'
import './util'



export const Dashboard = ({images,page}) => (

	<Canvas style={{ width: '100vw', height: '100vh', overflowX: 'hidden', position: 'absolute', top: 0, left: 0 }} camera={{ position: [0, 0, 10], fov: 15 }}>
		<Carousel images={images} page={page} />
		<OrbitControls />
		<Environment preset='forest' background />
	</Canvas>

)

function Carousel({ radius = 2, images, page }) {


	

	return (
		<>
			{ images.length > 0 && 
				images.map((src, i) => (

					<Card
						key={i}
						url={src.photoUrl}
						position={[Math.sin((i / images.length) * Math.PI * 2) * radius, 0, Math.cos((i / images.length) * Math.PI * 2) * radius]}
						rotation={[0, Math.PI + (i / images.length) * Math.PI * 2, 0]}
					/>
				))
			}

			
		</>
		
	)
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
		<Image ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>
			<bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
		</Image>
	)
}



