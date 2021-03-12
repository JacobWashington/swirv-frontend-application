// Imports
import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { Redirect } from 'react-router-dom';

const { REACT_APP_SERVER_URL } = process.env;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    axios
      .post(`${REACT_APP_SERVER_URL}/users/login`, userData)
      .then((response) => {
        const { token } = response.data;
        // save token to localStorage
        localStorage.setItem("jwtToken", token);
        // set token to headers
        setAuthToken(token);
        // decode token to get the user data
        const decoded = jwt_decode(token);
        // set the current user
        props.nowCurrentUser(decoded); // funnction passed down as props.
        console.log("Login.js - User Info >>>>", response.data.userData)
      })
      .catch((error) => {
        console.log("===> Error on login", error);
        alert("Either email or password is incorrect. Please try again");
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  if (props.user) return <Redirect to="/profile" /> // double check

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div class="box">
        <h1>Log In</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onFocus="field_focus(this, 'email');"
          onblur="field_blur(this, 'email');"
          className="form_input"
          onChange={handleEmail}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onFocus="field_focus(this, 'password');"
          onblur="field_blur(this, 'password');"
          className="form_input"
          onChange={handlePassword}
        />
        <button type="submit" id="btn">Submit</button>
        <p>Need an account?<a href="/signup"><p>Signup</p></a></p>
      </div>
    </form>
  </>
  );
};

export default Login;
