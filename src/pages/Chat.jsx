import {useState} from 'react'
import { Link } from 'react-router-dom'
import UserForm from '../components/UserForm';
import MatchedUsers from '../components/MatchedUsers';
import './Chat.css'


function Chat() {
  
    const [room, setRoom] = useState(null);
    
    
  return (
    
    <div className='chat-room'>

      

      
       
        <div className='chat-room-header'>
          <h1>Welcome to the Chat Room</h1>
          <p>Please enter some information about yourself so we can pair you with the best candidates</p>
        </div>
        <div className='user-form-wrapper'>
                <UserForm />
            </div>
        

       
        
       
        {/* <MatchedUsers/> */}
        {/* <div className='links'>
          <h1>
            <Link to={'/'}>HomePage</Link>
          </h1>
          <h1>
            <Link to={'/signup'}>Sign Up</Link> 
          </h1>
          <h1>
            <Link to={'/login'}>Log In</Link>
        </h1>
        </div> */}
        </div>
        
    
    
    
  )
}

export default Chat