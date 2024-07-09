import React, { useEffect, useState } from 'react';
import 'aframe';
import aframe from 'aframe';
import { Entity, Scene } from 'aframe-react';
import '@ar-js-org/ar.js/aframe/build/aframe-ar.js';
import { collection, query, orderBy, startAfter, limit, getDocs, endBefore, limitToLast } from 'firebase/firestore';
import { db } from './firebase';
import { v4 } from 'uuid';



const ARScene = () => {




	// const initialImages = [
	//   'https://firebasestorage.googleapis.com/v0/b/blog-e0c2d.appspot.com/o/files%2Fae76b2ac-c14b-4f83-ab82-b20699d04eb8?alt=media&token=38e3108e-bfe9-44d6-9183-5f7687c58570',
	//   'https://images.pexels.com/photos/19734107/pexels-photo-19734107/free-photo-of-traditional-wedding-indian-couple.jpeg?auto=compress&cs=tinysrgb&w=600',
	//   'https://images.pexels.com/photos/17261594/pexels-photo-17261594/free-photo-of-smiling-bride-and-groom-in-traditional-costumes.jpeg?auto=compress&cs=tinysrgb&w=600',
	// ];

	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);




	useEffect(() => {
		const fetchData = async () => {
			try {
				const first = query(collection(db, "images"), orderBy('createdAt', 'desc'), limit(3));
				const querySnapshot = await getDocs(first);
				const imagesData = [];
				querySnapshot.forEach((doc) => {
					imagesData.push(doc.data());
				});
				setImages(imagesData);
			} catch (error) {
				console.error("Error fetching images: ", error);
				alert('Something went wrong. Please reload.');
			}
		};

		fetchData();
	}, []);

	const showNext = async (item) => {
		if (images.length === 0) {
			alert("That's all we have for now!");
		} else {
			try {
				const next = query(collection(db, 'images'), orderBy('createdAt', 'desc'), startAfter(item.createdAt), limit(3));
				const querySnapshot = await getDocs(next);
				const newImages = [];
				querySnapshot.forEach((doc) => {
					newImages.push(doc.data());
				});
				if (newImages.length > 0) {
					setImages(newImages);
					setPage(page + 1);
				} else {
					alert("No more images.");
				}
			} catch (error) {
				console.error("Error fetching next images: ", error);
			}
		}
	};


	const showPrevious = async (item) => {
		if (images.length === 0) {
		  alert("No previous images.");
		} else {
		  try {
			const prev = query(collection(db, 'images'), orderBy('createdAt', 'desc'), endBefore(item.createdAt), limitToLast(3));
			const querySnapshot = await getDocs(prev);
			const newImages = [];
			querySnapshot.forEach((doc) => {
			  newImages.push(doc.data());
			});
			if (newImages.length > 0) {
			  setImages(newImages);
			  setPage(page - 1);
			} else {
			  alert("No previous images.");
			}
		  } catch (error) {
			console.error("Error fetching previous images: ", error);
		  }
		}
	  };




	const createImageEntities = () => {
		return images.map((src, index) => (
			<Entity
				key={index + v4()}
				geometry={{ primitive: 'plane' }}
				material={{ src: src.photoUrl }}
				position={{ x: (index - Math.floor(images.length / 2)) * 2, y: 0, z: -3 }}
				scale={{ x: 1.5, y: 1.5, z: 1.5 }}
				id={index + v4()}
			/>
		));
	};

	return (
		<>
			{
				images.length > 0

					?
					(
						<>
							<Scene arjs="sourceType: webcam; debugUIEnabled: false;">
								<Entity camera look-controls="enabled: true; magicWindowTrackingEnabled: true;" />
								{createImageEntities()}
							</Scene>
							<button onClick={() => showNext(images[images.length - 1])} style={{ position: 'absolute', bottom: 20, left: '50%' }}>
								Next
							</button>
							<button onClick={() => showPrevious(images[0])} style={{ position: 'absolute', bottom: 20, left: '10%' }}>
								Prev
							</button>

						</>

					)
					:
					<div>no file found</div>
			}


		</>
	);
};

export default ARScene;