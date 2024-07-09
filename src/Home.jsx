import { Dashboard } from './Dashboard'
import './index.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { collection, query, orderBy, startAfter, limit, getDocs, endBefore, limitToLast } from 'firebase/firestore';
import { db } from './firebase';
import Loading from './Loading';

function Home() {

	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const first = query(collection(db, "images"), orderBy('createdAt', 'desc'), limit(10));
				const querySnapshot = await getDocs(first);
				const imagesData = [];
				querySnapshot.forEach((doc) => {
					imagesData.push(doc.data());
				});
				setImages(imagesData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching images: ", error);
				alert('Something went wrong. Please reload.');
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const showNext = async (item) => {
		if (images.length === 0) {
			alert("That's all we have for now!");
		} else {
			try {
				setLoading(true);
				const next = query(collection(db, 'images'), orderBy('createdAt', 'desc'), startAfter(item.createdAt), limit(10));
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
				setLoading(false);
			} catch (error) {
				console.error("Error fetching next images: ", error);
				setLoading(false);
			}
		}
	};

	const showPrevious = async (item) => {
		if (images.length === 0) {
			alert("No previous images.");
		} else {
			try {
				setLoading(true);
				const prev = query(collection(db, 'images'), orderBy('createdAt', 'desc'), endBefore(item.createdAt), limitToLast(10));
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
				setLoading(false);
			} catch (error) {
				console.error("Error fetching previous images: ", error);
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		return () => {
			const video = document.getElementById('arjs-video');
			if (video) {
				const stream = video.srcObject;
				if (stream) {
					const tracks = stream.getTracks();
					tracks.forEach(track => track.stop());
				}
				video.srcObject = null;
				video.parentNode.removeChild(video);
			}
		};
	}, []);

	return (
		<>
			<Link style={{ position: 'absolute', zIndex: '1000', top: 10, left: 10, padding: '10px 20px', backgroundColor: 'lightgray', color: 'red', textDecoration: 'none', borderRadius: '5px' }} to={'/ar'}>
				Enter AR Mode
			</Link>
			<button onClick={() => showPrevious(images[0])} style={{ position: 'absolute', zIndex: '1000', bottom: 10, left: 10, padding: '10px 20px', backgroundColor: 'lightgray', color: 'red', textDecoration: 'none', borderRadius: '5px' }}>
				Prev
			</button>
			<button onClick={() => showNext(images[images.length - 1])} style={{ position: 'absolute', zIndex: '1000', bottom: 10, right: 10, padding: '10px 20px', backgroundColor: 'lightgray', color: 'red', textDecoration: 'none', borderRadius: '5px' }}>
				Next
			</button>
			{loading ? (
				<Loading />
			) : (
				<Dashboard images={images} page={page} />
			)}
		</>
	)
}

export default Home
