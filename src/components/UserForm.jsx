import {useState} from 'react'
import { issuesArea, intrests, ageRanges } from '../static/data'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import Multiselect from './Multiselect';
import MultiSelectDropdown from './IssuesMultiselect';


function UserForm() {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState(''); 
    const [country, setCountry] = useState('');
    const [selectedIntrests, setSelectedIntrests] = useState([]); 
    const [issues, setIssues] = useState([]);

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        return(
            console.log('yeah')


        )

    }

      
    





    return (
        <div className='design'>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <FormControl>
                    <TextField
                        sx={{marginBottom: '20px'}}
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
                        <MenuItem value="USA">USA</MenuItem>
                    </TextField>

                    <Multiselect  intrests={intrests} selectedIntrest={selectedIntrests} setSelectedIntrest={setSelectedIntrests} />

                    <MultiSelectDropdown issuesArea={issuesArea} selectedIssues={issues} setSelectedIssues={setIssues} />

                    <Button variant="outlined" type='submit' sx={{ color: '#000000' }} >Submit</Button>



            
                    </FormControl>

                </form>
            </div>
        </div>
    )
}

export default UserForm