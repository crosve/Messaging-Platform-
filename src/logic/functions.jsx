import { useEffect } from "react";
import {db} from "../firebase";
import { collection, getDocs } from "firebase/firestore";



 const matchUsers = (currentUser, allVolunteers) => {
    const weights ={
        gender: 1,
        age: 2,
        interests: 3,
        issues: 3,
    }

    const userScore = allVolunteers.map(volunteer => {
        const score = Object.keys(weights).reduce((total, key) => {
            if (key === 'interests' || key === 'issues') {
                const commonCount = currentUser[key].filter(item => volunteer[key].includes(item)).length
                return total + weights[key] * (commonCount/Math.max(currentUser[key].length, 1)); 
            } else {
                return total + weights[key] * (currentUser[key] === volunteer[key] ? 1 : 0)
            }
        }, 0);
        return { userId: volunteer.userId, score };
    });

    const sortedUsers = userScore.sort((a, b) => b.score - a.score);

    return sortedUsers.slice(0, 15);



}

export default matchUsers;


// const matchUsers = (currentUser, allUsers) => {
//     // Matching weights (you can adjust these based on your preferences)
//     const weights = {
//       age: 2,
//       gender: 1,
//       interests: 3,
//       issues: 3,
//     };
  
//     // Calculate a match score for each user
//     const userScores = allUsers.map((user) => {
//       const score = Object.keys(weights).reduce((total, key) => {
//         if (key === 'interests' || key === 'issues') {
//           // For array properties, calculate the number of common elements
//           const commonCount = currentUser[key].filter((item) => user[key].includes(item)).length;
//           return total + weights[key] * (commonCount / Math.max(currentUser[key].length, 1));
//         } else {
//           // For non-array properties, calculate a simple match (1 or 0)
//           return total + weights[key] * (currentUser[key] === user[key] ? 1 : 0);
//         }
//       }, 0);
  
//       return { userId: user.userId, score };
//     });
  
//     // Sort users by match score in descending order
//     const sortedUsers = userScores.sort((a, b) => b.score - a.score);
  
//     // Return the best matches
//     return sortedUsers.slice(0, 5); // Adjust the number to get the desired number of matches
//   };
  
