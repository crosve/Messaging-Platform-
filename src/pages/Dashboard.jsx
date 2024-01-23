import { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { UserAuthContext } from '../context/UserAuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

function Dashboard() {
  const { logOut, user } = useContext(UserAuthContext);
  const [userData, setUserData] = useState(null);

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming there's only one document for the user
          const userDoc = querySnapshot.docs[0].data();
          setUserData(userDoc);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getData();
  }, [user.uid]); // Adding user.uid as a dependency to re-fetch data when the user changes

  return (
    <>
      <h1>Welcome {user && user.email}</h1>
      <div>Dashboard</div>
      <h1>Your Information</h1>
   

      <Button variant="outlined" onClick={handleLogOut}>
        LogOut
      </Button>
    </>
  );
}

export default Dashboard;