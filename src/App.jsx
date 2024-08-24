import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './Components/Navbar'
import UserSevice from './Components/Utility/User'
import { useDispatch } from 'react-redux'
import { userLogin } from './Store/authSlice'
import { useSelector } from 'react-redux'
function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isLoggedin)
  console.log(isLoggedIn)
  UserSevice.getCurrentUser()
    .then((userDetails) => {
      if (userDetails.status < 400)
        dispatch(userLogin(userDetails.data))
      else
        console.log(userDetails)
    })
    .catch((err) => {
      console.log("User not logged in or registered", err)
    })

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Outlet />
    </>
  )
}

export default App
