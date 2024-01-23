import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import HomePage from './pages/Homepage'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './Dashboard'
import Chat from './components/Chat'
// import { UserAuthContextFunction9 } from './context/UserAuthContext'
import ProtectedRoute from './ProtectedRoute'
import { useContext } from 'react'
import { UserAuthContext } from './context/UserAuthContext'

function App() {
  const {user} = useContext(UserAuthContext);
  

  return (
    <>
    
  
    {/* <UserAuthContextFunction9> */}
    <div className='design'>
      <div className="container">
        <Routes>
          <Route path='/' element={user ? <Navigate to="/dashboard"/>:  <HomePage/>}/>
          <Route path='/signup' element={user ? <Navigate to="/dashboard"/>:<Signup/>}/>
          <Route path='/login' element={user ? <Navigate to="/dashboard"/>:<Login/>}/>
          <Route path='/chat' element={user? <Navigate to='/dashboard'/> : <Chat/>}/>
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }/>

        </Routes>
        
      </div>
    
    </div>

    {/* </UserAuthContextFunction9> */}

    </>
  
  )
}

export default App
