import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserSevice from "./Utility/User";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoadingState, userLogin } from "../Store/authSlice";

const RegisterPage = () => {
  const diispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    diispatch(setLoadingState(true));
    const formDataObj = new FormData();
    formDataObj.append("fullname", formData.fullname);
    formDataObj.append("email", formData.email);
    formDataObj.append("username", formData.username);
    formDataObj.append("password", formData.password);
    formDataObj.append("avatar", formData.avatar);
    formDataObj.append("coverImage", formData.coverImage);

    try {
      const response = await UserSevice.register(formDataObj);
      if (response?.status < 300) {
        setMessage(response.data.message);
        setError(null);
        diispatch(userLogin(response.data));
        navigate("/");
      } else {
        setMessage(null);
        setError(response?.data?.message || "Please try again");
      }
    } catch (err) {
      setMessage(null);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      diispatch(setLoadingState(false));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Register</h2>
        {message && <p style={styles.successMessage}>{message}</p>}
        {error && <p style={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name*:</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email*:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username*:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password*:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Avatar*:</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Cover Image:</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        <p style={styles.loginRedirect}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  formContainer: {
    backgroundColor: "#222",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    width: "100%",
    maxWidth: "0vh",
    minWidth: "400px",
  },
  heading: {
    color: "#fff",
    textAlign: "center",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    color: "#aaa",
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#333",
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
  },
  successMessage: {
    color: "green",
    textAlign: "center",
    marginBottom: "15px",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  },
  loginRedirect: {
    color: "#aaa",
    textAlign: "center",
    marginTop: "20px",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
  },
};

export default RegisterPage;
