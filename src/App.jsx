import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import UserSevice from "./Components/Utility/User";
import { useDispatch, useSelector } from "react-redux";
import { setBackendReady, userLogin } from "./Store/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/NavBar";
import checkBackendHealth from "./Components/HealthCheck"; // Import the health check function
import { info } from "./Store/ErrorMessageSlice";
import Loader from "./Components/Loader";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initializeApp = async () => {
      const backendReady = await checkBackendHealth();
      console.log(backendReady);
      if (backendReady) {
        dispatch(setBackendReady(true));
        UserSevice.getCurrentUser()
          .then((userDetails) => {
            if (userDetails.status < 400) {
              dispatch(userLogin(userDetails.data.data));
            } else {
              console.log(userDetails);
            }
          })
          .catch((err) => {
            console.log("User not logged in or registered", err);
            dispatch(info("Internal Server Error"));
          });
      } else dispatch(info("Backend is Not ready yet. Please Refresh"));
      setLoading(false);
    };

    initializeApp();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <NavBar isLoggedIn={isLoggedIn} />
          <Outlet />
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
