import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserAuthContext } from '../../context/UserAuthContext'
import "./Homepage.css" 


function Homepage() {
  const {user} = useContext(UserAuthContext);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    document.title = 'Beacon of Hope - Mental Helath Support';
    if(user) {
        navigate('/dashboard');
    }

},[user, navigate]);
  
  return (
    <>
    {/* {user && <Navigate to='/dashboard'/>}: */}

        <header className='comings'>  COMING SOON </header>

        <header className='Beacon'>Welcome to Beacon of Hope</header>
        <div className='img'>
            <img src="./Beacon.jpg" alt="Beacon" className='beacon-img'/>  
        </div>
           
     
        <main>

            <div>
                <p className='p'>Your guiding light in mental health and wellbeing. Beacon of Hope is dedicated to providing comprehensive 
                    mental health care and support service. We strive to be a leading resource for individuals seeking
                    to improve their mental health and wellbeing.</p>
            </div>
        </main>   

        <div>
            < h1 className="signup">
                <Link to={'/signup'}>Sign Up</Link>

            </h1>
            <h1 className='signup'>
                <Link to={'/login'}>Log In</Link>

            </h1>
            <h1 className='signup'>
                <Link to={'/chat'}>Chat</Link>
            </h1>
        </div>

        <footer className='footer'>
        &copy; 2024 Beacon of Hope. All rights reserved.
    </footer>

    </>
  )
}

export default Homepage
