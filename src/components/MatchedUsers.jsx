import React from 'react';
import VolunteerCard from './Card';
import './CardStyling.css';

function MatchedUsers({ matchedUsers }) {
  return (
    <div className='card-container'>
        {matchedUsers&&
            matchedUsers.map((user, i) => (
                <VolunteerCard key={i} {...user} />
            ))
        }

    </div>
  );
}

export default MatchedUsers;
