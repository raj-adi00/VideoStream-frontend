import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './Components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar isLoggedIn={false}/>
     <Outlet/>
    </>
  )
}

export default App
