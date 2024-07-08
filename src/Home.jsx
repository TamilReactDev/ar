import { createRoot } from 'react-dom/client'
import { Dashboard } from './Dashboard'
import './index.css'



function Home() {


  const handleNavigation = () => {
    window.location.href = '/ar';
  };

  return (
    <>
      
      <button onClick={handleNavigation} className="button navigation">
    Enter AR
  <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
    <path
      clip-rule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
      fill-rule="evenodd"
    ></path>
  </svg>
</button>
      <Dashboard />


    </>
  )
}


export default Home