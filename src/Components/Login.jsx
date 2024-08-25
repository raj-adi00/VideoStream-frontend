import React, { useState } from 'react';
import axios from 'axios';
import UserSevice from './Utility/User';
import { useDispatch } from 'react-redux';
import { userLogin } from '../Store/authSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdataobj = new FormData();
        formdataobj.append('username', formData.username)
        formdataobj.append('email', formData.email)
        formdataobj.append('password', formData.password)
        try {
            const user = await UserSevice.login(formdataobj)
            console.log(user.data.message)
            if (user?.status < 400) {
                dispatch(userLogin(user.data.user))
                setMessage(user.data.message)
                setError(null)
                navigate('/')
            } else {
                setMessage(null)
                setError(user?.data?.message || "Please try again")
            }
        } catch (err) {
            setMessage(null);
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-white text-center">Login</h2>
                {error && (
                    <div className="bg-red-500 text-white p-2 rounded mt-4 fixed">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="bg-green-500 text-white p-2 rounded mt-4 fixed">
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
