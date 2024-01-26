import React, { useState, useContext } from 'react';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { db } from '../firebase';
import {doc,  setDoc } from 'firebase/firestore';
import Multiselect from './Multiselect';
import MultiSelectDropdown from './IssuesMultiselect';
import "./signup.css";




function Signup() {
  const { signUp} = useContext(UserAuthContext);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassowrd] = useState('');
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [country, setCountry] = useState('');
  const [selectedIntrest, setSelectedIntrests] = useState([]);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [error, seterror] = useState('');



  const ageRanges = [
    { label: '18-20', value: '18-20' },
    { label: '20-30', value: '20-30' },
    { label: '30-40', value: '30-40' },
    { label: '40-50', value: '40-50' },
    { label: '50-60', value: '50-60' },
    { label: '60+', value: '60+' },
  ];

  const intrests = [
    {label: 'Reading', value: 'Reading'},
    {label: 'Writing', value: 'Writing'},
    {label: 'Drawing/Painting', value: 'Drawing/Painting'},
    {label: 'Sports', value: 'Sports'},
    {label: 'Cooking', value: 'Cooking'},
    {label: 'Music', value: 'Music'},
    {label: 'Movies', value: 'Movies'},
    {label: 'Traveling', value: 'Traveling'},
  ];

  const issuesArea = [
    {label: 'Suicide', value: 'Suicide'},
    {label: 'Self harm', value: 'Self harm'},
    {label: 'Stress', value: 'Stress'},
    {label: 'Anxiety', value: 'Anxiety'},
    {label: 'PTSD', value: 'PTSD'},
    {label: 'Gender Dysmorphia', value: 'Gender Dysmorphia'}
  ]

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      seterror("Password do not match"); 
      return;
    }
    const trimmedEmail = email.trim();


    console.log(trimmedEmail, password, selectedAgeRange, selectedGender, country, selectedIntrest, selectedIssues)
    try{
      await signUp(trimmedEmail, password).then((userCredentials) =>{
        const uid = userCredentials.user.uid;
        const userRef = doc(db, 'users', uid);

        return setDoc(userRef, {
          uid: uid,
          email: email,
          password: password,
          ageRange: selectedAgeRange,
          gender: selectedGender,
          country: country,
          intrests: selectedIntrest,
          issues: selectedIssues
        }
        ).catch((error) => {  
          console.log(error.message);
        })


      });
     
      navigate('/dashboard');

    }catch(error){
      seterror(error.message);
      console.log(error.message);
    }
   
  };

  const handleChange = (event) => {
    setSelectedAgeRange(event.target.value);
  }

  const handleGenderChange = (event) => { 
    setSelectedGender(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className='signup-form'>
      {error && <Alert severity="error">{error}</Alert>}
     
      <h1>Sign Up</h1>
      <FormControl>

        {/* <InputLabel id="Email">Age</InputLabel> */}
        <TextField
          
          sx={{marginBottom: '20px'}}
          id="Email"
          label="Email"
          variant="outlined"
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* <InputLabel id="Password">Password</InputLabel> */}
        <TextField
        
           sx={{marginBottom: '20px'}}
          id="Password"
          label="Password"
          variant="outlined"
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <TextField
        sx={{marginBottom: '20px'}}
        label="Confirm Password"
        variant="outlined"
        type='password'
        onChange={(e) => setConfirmPassowrd(e.target.value)}
        required
        >

        </TextField>

        <TextField
            sx={{marginBottom: '20px'}}
            label="Age"
            value={selectedAgeRange}
            onChange={handleChange}
            required
            select
        >
          {ageRanges.map((ageRange) => (
            <MenuItem
              key={ageRange.value}
              value={ageRange.value}
            >
              {ageRange.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
            sx={{marginBottom: '20px'}}
            label="Gender"
            value={selectedGender}
            onChange={handleGenderChange}
            required
            select
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
       
        </TextField>

        <TextField
            sx={{marginBottom: '20px'}}
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            select
        >
          <MenuItem value="United States">United States</MenuItem>
        </TextField>



        {/*This is our drop down multiSelect for our intrests area(max can select 5) */}
        <Multiselect intrests={intrests} selectedIntrest={selectedIntrest} setSelectedIntrest={setSelectedIntrests} />


        {/*This is our drop down multiSelect for our issues area(max can select 5) */}
        <MultiSelectDropdown issuesArea={issuesArea} selectedIssues={selectedIssues} setSelectedIssues={setSelectedIssues} />


        <Button type="submit" variant="outlined" sx={{ color: '#000000' }}>
          Submit
        </Button>
        <h1>
          Already have an account? <Link to={'/login'}> Log In</Link>
        </h1>
        <h1>
          <Link to={'/'}>Homepage</Link>
        </h1>
      </FormControl>
    </form>
  );
}

export default Signup;

