import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import url from '../url'

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const handleSuccess = (msg) =>
    toast.success('User Logged in Successfully')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${url}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message, token } = data;
      if (token) {
        Cookies.set('token', token);
      }
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      // console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div
      className="login_container"
      style={{
        backgroundImage: `url("LOGIN.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="form_container"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          padding: "40px 30px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "400px",
          boxSizing: "border-box"
        }}
      >
        <h1 style={{
          fontFamily: "cursive",
          fontStyle: "italic bold",
          fontSize: "48px",
          textAlign: "center",
          marginBottom: "10px"
        }}>
          Agrisense
        </h1>
        <h2 style={{ marginBottom: "30px", textAlign: "center", fontSize: "24px" }}>Login Account</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#007bff",
              border: "none",
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            Submit
          </button>

          <span style={{ textAlign: "center", marginTop: "10px" }}>
            Already have an account? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default Login;
