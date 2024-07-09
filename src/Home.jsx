import { createRoot } from 'react-dom/client'
import { Dashboard } from './Dashboard'
import './index.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';



function Home() {


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

     <Link style={{position:'absolute',zIndex:"1000", top:0, left:0,  color:'red'}} to={'/ar'}>enter vr mode</Link>
      <Dashboard />
    </>
  )
}


export default Home
