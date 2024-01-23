import {useState} from 'react'
import { Link } from 'react-router-dom'
import UserForm from '../components/UserForm';


function Chat() {
  
    const [room, setRoom] = useState(null);
    
    
  return (
    <div>
      <h1>Welcome to the Chat Room</h1>
      <p>To give you the best experience, please fill out some detail about yourself</p>
      <UserForm/>
      <h1>
        <Link to={'/'}>HomePage</Link>
      </h1>
      <h1>
        <Link to={'/signup'}>Sign Up</Link> 
      </h1>
      <h1>
        <Link to={'/login'}>Log In</Link>
      </h1>

    </div>
    
  )
}

export default Chat