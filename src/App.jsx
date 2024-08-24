import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './Components/Navbar'
import UserSevice from './Components/Utility/User'
import { useDispatch } from 'react-redux'
import { userLogin } from './Store/authSlice'
function App() {
  const dispatch = useDispatch()
  UserSevice.getCurrentUser()
    .then((userDetails) => {
      if (userDetails.status < 400)
        dispatch(userLogin({ userDetails }))
      else
        console.log(userDetails)
    })
    .catch((err) => {
      console.log("User not logged in or registered", err)
    })

  return (
    <>
      <NavBar isLoggedIn={false} />
      <Outlet />
    </>
  )
}

export default App
