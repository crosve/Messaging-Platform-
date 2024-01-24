import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function VolunteerCard({gender, country, ageRange, interests, issues }) {
  return (
    <Card sx={{maxWidth: 275, background: 'palette.background.default'}}>
        <CardContent>
            <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
                Gender: {gender}
            </Typography>
            <Typography variant="h5" component="div">
                Location: {country}
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Age-Range: {ageRange}
            </Typography>

            <Typography variant="body2">
                Interests: 
                {interests.map((interest, i) => (
                    <span key={i}>{interest.label}{i < interests.length - 1 ? ', ' : ''}</span>
                ))}
            </Typography>

            <Typography variant="body2">
                Issues:
                {issues.map((issue, i) => (
                    <span key={i}>{issue.label}{i < issues.length - 1 ? ', ' : ''}</span>
                ))}
            </Typography>
        </CardContent>

    </Card>

  )
}

export default VolunteerCard