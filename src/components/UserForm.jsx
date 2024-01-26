import {useState, useEffect, useContext} from 'react'
import { issuesArea, intrests, ageRanges } from '../static/data'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import Multiselect from './Multiselect';
import MultiSelectDropdown from './IssuesMultiselect';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { UserAuthContext } from '../context/UserAuthContext';
import MatchedUsers from './MatchedUsers';
import "./userform.css"; 


function UserForm() {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState(''); 
    const [country, setCountry] = useState('');
    const [selectedIntrests, setSelectedIntrests] = useState([]); 
    const [issues, setIssues] = useState([]);
    let sortedUsers = [];
    const [users, setUsers] = useState([]);
    // const [currentUser, setCurrentUser] = useState();
    const [finalSortedVolunteers, setFinalSortedVolunteers] = useState([]);

    const {matchUsers} = useContext(UserAuthContext);

    useEffect(() =>{
        const fetchUsers = async () => {
            try{
                const userCollections = collection(db, 'users');
                const querySnapshot = await getDocs(userCollections);

                const allUsers = [];
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    const selectedUserData = {
                        ageRange: userData.ageRange,
                        country: userData.country,
                        gender: userData.gender,
                        intrests: userData.intrests,
                        issues: userData.issues,
                        userId: userData.uid

                    }
                    allUsers.push(selectedUserData);
                });
                setUsers(allUsers);

            }catch(error){
                console.log(error)
            }
    }
    fetchUsers();
    }, [])

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        const currentUser = {
            ageRange: age,
            country: country,
            gender: gender,
            intrests: selectedIntrests,
            issues: issues
        }
        sortedUsers = matchUsers(currentUser, users);
        setFinalSortedVolunteers(sortedUsers);
 
 

    }

    const reroll = () => {
        // Check if there are at least three users
        if (finalSortedVolunteers.length >= 3) {
          const firstThreeUsers = finalSortedVolunteers.slice(0, 3);
          const remainingUsers = finalSortedVolunteers.slice(3);
          const rerolledUsers = [...remainingUsers, ...firstThreeUsers];
          setFinalSortedVolunteers(rerolledUsers);
        }
      };



    return (
        <>
      
                <form onSubmit={handleSubmit} className='user-form'>
                    <FormControl>
                    <TextField
                        sx={{marginBottom: '20px', width: '400px'}}
                        label="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
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
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
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

                    <Multiselect
                      intrests={intrests} selectedIntrest={selectedIntrests} setSelectedIntrest={setSelectedIntrests} />

                    <MultiSelectDropdown
                        
                     issuesArea={issuesArea} selectedIssues={issues} setSelectedIssues={setIssues} />

                    <Button
                        
                     variant="outlined" type='submit' sx={{ color: '#000000', marginBottom: '50px'}} >Submit</Button>

                    </FormControl>
{/* 
                    {finalSortedVolunteers && <MatchedUsers matchedUsers={finalSortedVolunteers} />}
                    {finalSortedVolunteers.length !== 0 && 
                    <Button
                        onClick={reroll}
                        variant='outlined'
                        sx={{ color: '#000000'}}
                    >Reroll</Button>} */}

                </form>
            {/* {finalSortedVolunteers.length === 0 && <h1>No Matches Found</h1>} */}
            {finalSortedVolunteers && <MatchedUsers matchedUsers={finalSortedVolunteers} />}
            {finalSortedVolunteers.length !== 0 && 
            <Button
                onClick={reroll}
                variant='outlined'
                sx={{ color: '#000000'}}
            >Reroll</Button>}
            
        </>
            
    )
}

export default UserForm