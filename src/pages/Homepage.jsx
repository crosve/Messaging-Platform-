import React from 'react'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <>
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