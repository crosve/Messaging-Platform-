import React from 'react'
import { TextField,  Autocomplete, MenuItem} from '@mui/material'


function Multiselect({intrests, selectedIntrest, setSelectedIntrest}) {



  return (
    <Autocomplete
        sx={{marginBottom: '20px', width: '400px'}}
        multiple
        id="intrests-select"
        options={intrests}
        value={selectedIntrest}
        onChange={(event, newValue) => 
          {if (newValue.length <= 5) {
            setSelectedIntrest(newValue);
          }
        }}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Interests"
            required={selectedIntrest.length === 0}
          />
        )}
        renderOption={(props, option, {selected}) =>(
            <MenuItem {...props}>
                {option.label}
            </MenuItem>
        )}
    />

    
  
  )
}

export default Multiselect