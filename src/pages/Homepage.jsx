import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserAuthContext } from '../context/UserAuthContext'

function Homepage() {
  const {user} = useContext(UserAuthContext);
  return (
    <>
    {/* {user && <Navigate to='/dashboard'/>}: */}

        <div>Homepage</div>
        <div>
            <h1>
                <Link to={'/signup'}>Sign Up</Link>

            </h1>
            <h1>
                <Link to={'/login'}>Log In</Link>

            </h1>
            <h1>
                <Link to={'/chat'}>Chat</Link>
            </h1>
        </div>
    </>
  )
}

export default Homepage