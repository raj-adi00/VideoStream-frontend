import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserSevice from './Utility/User';
import { useDispatch } from 'react-redux';
import { userLogout } from '../Store/authSlice';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ isLoggedIn }) => {
    const [message, setMessage] = useState(null);
    const [error, seterror] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const response = await UserSevice.logout();
            if (response.status < 400) {
                setMessage(response.data.message);
                seterror(null);
                dispatch(userLogout());
                navigate('/');
                window.location.reload();
            } else {
                setMessage(null);
                seterror(response?.data?.message || "Please retry");
            }
        } catch (err) {
            console.log("error at logout", err);
            setMessage(null);
            seterror(err.response?.data?.message || 'Something went wrong');
        }
    }

    return (
        <div>
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
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="hover:text-gray-300"
                        >
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

                <div className='flex gap-9 justify-center items-center'>

                    {isLoggedIn && <NavLink
                        to="/upload-video"
                        className={({ isActive }) =>
                            isActive ? "text-blue-500" : "hover:text-gray-300"
                        }
                    >
                        Upload Video
                    </NavLink>}

                    {/* Toggle for dark and light theme */}
                    <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        Dark/Light
                    </button>
                </div>
            </nav>
            <div className="pt-10 px-4">
                {message && (
                    <div className="bg-green-500 text-white p-2 rounded mb-4">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="bg-red-500 text-white p-2 rounded mb-4">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
