
import { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, linkWithPopup } from 'firebase/auth';
import {doc,  setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const UserAuthContext = createContext();

// Context provider
export function UserAuthContextFunction9({ children }) {
  const [user, setUser] = useState();
    const [error, seterror] = useState('');

  function signUp(email, password) {
    const trimmedEmail = email.trim();

    return createUserWithEmailAndPassword(auth, trimmedEmail, password);
  }

  const addDetails = async (email, password, selectedAgeRange, selectedGender, country, selectedIntrest, selectedIssues) => {
    try{
      const user = await signUp(email, password);
      const uid = user.user.uid;
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, {
        uid: uid,
        email: email,
        password: password,
        age: selectedAgeRange,
        gender: selectedGender,
        country: country,
        intrests: selectedIntrest,
        issues: selectedIssues
      })
    }catch(error){
      seterror(error.message);
      console.log(error);
    }

  }


  function logIn(email, password) {
    const trimmedEmail = email.trim();

    return signInWithEmailAndPassword(auth, trimmedEmail, password);
  }

  function logOut(){
    return signOut(auth);
  }

  function googleLogIn(){
    // const googleCredential = GoogleAuthProvider.credential(googleIdToken, googleAccessToken);

    const provide = new GoogleAuthProvider();
    return signInWithPopup(auth, provide);
    // return linkWithPopup(auth.currentUser, provide).then((result) => {
    //   // Accounts successfully linked.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const user = result.user;
    //   // ...
    // })
  }
  const matchUsers = (currentUser, allVolunteers) => {
    const weights = {
      gender: 1,
      age: 2,
      interests: 3,
      issues: 3,
    };
  
    const userScore = allVolunteers.map((volunteer) => {
      const score = Object.keys(weights).reduce((total, key) => {
        if (key === 'interests' || key === 'issues') {
          const currentUserArray = currentUser[key] || [];
          const volunteerArray = volunteer[key] || [];
  
          const commonCount = currentUserArray.filter((item) =>
            volunteerArray.some((volunteerItem) => volunteerItem.label === item.label)
          ).length;
  
          return total + weights[key] * (commonCount / Math.max(currentUserArray.length, 1));
        } else {
          return total + weights[key] * (currentUser[key] === volunteer[key] ? 1 : 0);
        }
      }, 0);
      return { 
        userId: volunteer.userId,
        gender: volunteer.gender,
        location: volunteer.country,
        ageRange: volunteer.ageRange,
        interests: volunteer.intrests,
        issues: volunteer.issues,
        score 
      };
    });
  
    const sortedUsers = userScore.sort((a, b) => b.score - a.score);
  
    return sortedUsers.slice(0, 15);
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
     
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const values = {
    signUp,
    logIn,
    user,
    logOut,
    googleLogIn,
    addDetails,
    matchUsers,


  };

  return (
    <UserAuthContext.Provider value={values}>
      {children}
    </UserAuthContext.Provider>
  );
}


