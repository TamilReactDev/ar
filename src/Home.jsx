import { createRoot } from 'react-dom/client'
import { Dashboard } from './Dashboard'
import './index.css'
import { Link } from 'react-router-dom';



function Home() {


  const handleNavigation = () => {
    window.location.href = '/ar';
  };

  return (
    <>
      
     <Link to={'/ar'}>enter ae mode</Link>
      <Dashboard />


    </>
  )
}


export default Home
