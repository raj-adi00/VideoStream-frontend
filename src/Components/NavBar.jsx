import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ isLoggedIn }) => {
    return (
        <nav className="bg-gray-800 text-white flex items-center justify-between fixed w-full z-10 dark:bg-gray-900">
            <div className="flex items-center space-x-4 px-3">
                <div>
                    VIDEOstream
                </div>
                <NavLink
                    exact
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-blue-500" : "hover:text-gray-300"
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/user"
                    className={({ isActive }) =>
                        isActive ? "text-blue-500" : "hover:text-gray-300"
                    }
                >
                    User
                </NavLink>
                <NavLink
                    to="/tweet"
                    className={({ isActive }) =>
                        isActive ? "text-blue-500" : "hover:text-gray-300"
                    }
                >
                    Tweet
                </NavLink>
                {
                    isLoggedIn && <NavLink
                        to="/my-video"
                        className={({ isActive }) =>
                            isActive ? "text-blue-500" : "hover:text-gray-300"
                        }
                    >
                        My videos
                    </NavLink>
                }
                {isLoggedIn ? (
                    <NavLink
                        to="/logout"
                        className={({ isActive }) =>
                            isActive ? "text-blue-500" : "hover:text-gray-300"
                        }
                    >
                        Logout
                    </NavLink>
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
            <div>
                {/* Toggle for dark and light theme */}
                <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    Dark/Light
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
