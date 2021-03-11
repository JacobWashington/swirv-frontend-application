// Imports
import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
const { REACT_APP_SERVER_URL } = process.env;

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
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
    setName(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" htmlFor="name" placeholder="Name" name="name" onChange={handleName}></input>
        </div>
        <div>
          <label>Email</label>
          <input type="email" htmlFor="email" placeholder="Email" name="email" onChange={handleEmail}></input>
        </div>
        <div>
          <label>Password</label>
          <input type="password" htmlFor="password" placeholder="Password" name="password" onChange={handlePassword}></input>
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleConfirmPassword}></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
