import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Navbar , HeroContainer} from './landingPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <HeroContainer />
  </React.StrictMode>
)
