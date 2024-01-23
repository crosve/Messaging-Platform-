import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserAuthContextFunction9 } from './context/UserAuthContext'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContextFunction9>
    <Router>
    <App />
    </Router>
    </UserAuthContextFunction9>
  </React.StrictMode>,
)
