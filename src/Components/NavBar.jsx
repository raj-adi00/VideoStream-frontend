import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import UserSevice from "./Utility/User";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingState, userLogout } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { info } from "../Store/ErrorMessageSlice";
import handleAxiosError from "./Frequent/HandleAxiosError";

const NavBar = ({ isLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.userDetails?.username);

  async function handleLogout() {
    dispatch(setLoadingState(true));
    try {
      const response = await UserSevice.logout();
      if (response.status < 400) {
        dispatch(userLogout());
        navigate("/");
        window.location.reload();
      } else {
        dispatch(info(handleAxiosError(response).message));
      }
    } catch (err) {
      console.log("error at logout", err);
      dispatch(info(handleAxiosError(err).message));
    } finally {
      dispatch(setLoadingState(false));
    }
  }

  return (
    <div>
      <nav className="bg-gray-800 text-white flex items-center justify-between fixed w-full z-10 dark:bg-gray-900">
        <div className="flex items-center space-x-4 px-3">
          <div>VIDEOstream</div>
          <NavLink
            exact
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "hover:text-gray-300"
            }
          >
            Home
          </NavLink>
          {username && (
            <NavLink
              to={`/u/${username}`}
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "hover:text-gray-300"
              }
            >
              User
            </NavLink>
          )}
          <NavLink
            to="/tweets"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "hover:text-gray-300"
            }
          >
            Tweet
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/my-video"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "hover:text-gray-300"
              }
            >
              My videos
            </NavLink>
          )}
          {isLoggedIn && <NavLink to="/load-chat">Chat</NavLink>}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-gray-300">
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "hover:text-gray-300"
              }
            >
              Login/Register
            </NavLink>
          )}
        </div>

        <div className="flex gap-9 justify-center items-center">
          {isLoggedIn && (
            <NavLink
              to="/upload-video"
              className={({ isActive }) =>
                isActive ? "text-blue-500 px-3" : "hover:text-gray-300 px-3"
              }
            >
              Upload Video
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
