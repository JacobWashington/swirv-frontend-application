// Imports
import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
const { REACT_APP_SERVER_URL } = process.env;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (password === confirmPassword && password.length >= 8) {
      const newUser = { name, email, password };
      axios
        .post(`${REACT_APP_SERVER_URL}/users/register`, newUser)
        .then((response) => {
          console.log("===> Yay, new user");
          console.log(response);
          setRedirect(true);
        })
        .catch((error) => console.log("===> Error in Signup", error));
    } else {
      if (password !== confirmPassword) return alert("Passwords don't match");
      alert("Password needs to be at least 8 characters. Please try again.");
    }

  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (redirect) return <Redirect to="/login" />

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="box">
          <h1>Signup</h1>

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form_input"
            onChange={handleName}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form_input"
            onChange={handleEmail}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form_input"
            onChange={handlePassword}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="form_input"
            onChange={handleConfirmPassword}
          />
          <button type="submit" id="btn">Submit</button>
          <p>Already have an account? <a href="/login"><p>Sign In</p></a></p>
        </div>
      </form>
    </>
  );
};

export default Signup;
