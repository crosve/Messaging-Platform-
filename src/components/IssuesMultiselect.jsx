import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MenuItem } from '@mui/material';

function MultiSelectDropdown({ issuesArea, selectedIssues, setSelectedIssues }) {
  return (
    <Autocomplete
      sx={{ marginBottom: '20px', width: '400px' }}
      multiple
      id="issues-select"
      options={issuesArea}
      value={selectedIssues}
      onChange={(event, newValue) => {
        if (newValue.length <= 5) {
          setSelectedIssues(newValue);
        }
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Issues"
          required={selectedIssues.length === 0} // This is to make sure the user selects at least one issue
        />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem {...props}>
          {option.label}
        </MenuItem>
      )}
    />
  );
}

export default MultiSelectDropdown;
