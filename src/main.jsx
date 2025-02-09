import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import Login from "./Components/Login";
import VideoPage from "./Components/VideoPage";
import UploadVideoForm from "./Components/UploadVideoForm";
import Tweet from "./Components/Tweet/Tweet";
import ChatComponent from "./Components/Chat/Chatcomponent";
import MyVideo from "./Components/My Video/MyVideo";
import UserPage from "./Components/User/UserPage";
import ChatLoadingPage from "./Components/Chat/ChatLoadingPage";
import AddFriend from "./Components/Chat/AddFriend";
import RegisterPage from "./Components/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/:id",
        element: <VideoPage />,
      },
      {
        path: "/upload-video",
        element: <UploadVideoForm />,
      },
      {
        path: "/tweets",
        element: <Tweet />,
      },
      {
        path: "/chat",
        element: <ChatComponent />,
      },
      {
        path: "/my-video",
        element: <MyVideo />,
      },
      {
        path: "/u/:username",
        element: <UserPage />,
      },
      {
        path: "/load-chat",
        element: <ChatLoadingPage />,
      },
      {
        path: "/add-friend",
        element: <AddFriend />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
