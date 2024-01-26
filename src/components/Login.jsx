import {React, useState, useContext} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { UserAuthContext } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import GoogleButton from 'react-google-button';
import { FormControl } from '@mui/material';
import "./Login.css";

function Login() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 

  const {logIn, googleLogIn  } = useContext(UserAuthContext);
  const Navigate = useNavigate();



  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      
      await logIn(email, password);
      Navigate('/dashboard')
    }catch(error){
      setError(error.message); 

    }
  }

  const handleGoogleLogIn = async (e) =>{
    e.preventDefault();

    try{
      await googleLogIn(); 
      Navigate('/dashboard')

    }catch(error){
      setError(error.message); 
    }
  }




  return (
    
    <form  onSubmit={handleSubmit} className='login-form' >
      {error && <Alert severity="error">{error}</Alert>}
  
        <h1>Login</h1>
        <FormControl>
        <TextField sx={{marginBottom: '20px'}} id="outlined-basic" label="Email" variant='outlined' onChange={(e) => setEmail(e.target.value)}/>
        <TextField sx={{marginBottom: '20px'}} id="outlined-basic" label="password" variant='outlined' onChange = {(e) => setPassword(e.target.value)}/><br/>

        <Button variant="outlined" type='submit' sx={{ color: '#000000' }} >Log In</Button>
        {/* <div className='google-btn'>
          <GoogleButton onClick={handleGoogleLogIn}/>
        </div> */}
        <h1>Don't have an account? <Link to={'/signup'}>Sign up</Link></h1>
        <h1> <Link to ={'/'}>homepage</Link></h1>
        </FormControl>
    </form>
  )
}

export default Login