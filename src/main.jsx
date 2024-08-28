import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
import VideoPage from './Components/VideoPage.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: "",
      element: <Home />
    }, {
      path: "/register",
      element: <Register />
    },{
      path:"/login",
      element:<Login/>
    },{
      path:"/:video_public_id",
      element:<VideoPage/>
    }
  ]
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
