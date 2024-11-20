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
import UploadVideoForm from './Components/UploadVideoForm.jsx'
import Tweet from './Components/Tweet/Tweet.jsx'
import ChatComponent from './Components/Chat/Chatcomponent.jsx'
import MyVideo from './Components/My Video/MyVideo.jsx'
import UserPage from './Components/User/UserPage.jsx'
import ChatLoadingPage from './Components/Chat/ChatLoadingPage.jsx'

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
    }, {
      path: "/login",
      element: <Login />
    }, {
      path: "/:id",
      element: <VideoPage />
    }, {
      path: "/upload-video",
      element: <UploadVideoForm />
    }, {
      path: "/tweets",
      element: <Tweet />
    }, {
      path: "/chat",
      element: <ChatComponent />
    }, {
      path: "/my-video",
      element: <MyVideo />
    }, {
      path: "/u/:username",
      element: <UserPage />
    },{
      path:'/load-chat',
      element:<ChatLoadingPage/>
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
