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

  const handleSubmit = (e) => {
    e.preventDefault(); // at the beginning of a submit function
    // make sure password and confirm password are equal
    // password length >= 8 characters
    console.log("clicked");
    if (password === confirmPassword && password.length >= 8) {
      const newUser = { name, email, password };
      axios
        .post(`${REACT_APP_SERVER_URL}/users/register`, newUser)
        .then((response) => {
          console.log("===> Yay, new user");
          console.log(response);
          // setRedirect(true);
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="box">
          <h1>Signup</h1>

          <input
            type="text"
            name="name"
            placeholder="Name"
            onFocus="field_focus(this, 'name');"
            onblur="field_blur(this, 'name');"
            className="form_input"
            onChange={handleName}
          />

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onFocus="field_focus(this, 'confirmPassword');"
            onblur="field_blur(this, 'confirmPassword');"
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
