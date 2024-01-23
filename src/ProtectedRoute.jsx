import {React, useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {UserAuthContext} from './context/UserAuthContext'

const ProtectedRoute = ({children}) => {

    const {user} = useContext(UserAuthContext);

    if(!user){
        return <Navigate to={'/'} replace/>
    }
    else{
        return children;
    }







}
export default ProtectedRoute