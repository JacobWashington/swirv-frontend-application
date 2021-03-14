import {React, useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";
const {REACT_APP_SERVER_URL} = process.env;


const NewStoryline = (props) => {
    console.log("PROPS >>>", props)
    const userId = props.location.state.id
    console.log("USER ID >>>>>", userId)
    const [storylineName, setStorylineName] = useState("");
    let history = useHistory();

    const [currentUser, setCurrentUser] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(true);
  
    useEffect(() => {
      let token;
      if (!localStorage.getItem("jwtToken")) {
        setIsAuthenticated(false);
        console.log("====> Authenticated is now FALSE");
      } else {
        token = jwt_decode(localStorage.getItem("jwtToken"));
        setAuthToken(localStorage.getItem("jwtToken"));
        setCurrentUser(token);
      }
    }, []);
    console.log("CURRENT USER >>>", currentUser)

    
    const handleStorylineName = (e) => {
        setStorylineName(e.target.value)
    }

    const infoForStoryline = {authId: userId, title:`${storylineName} - by ${currentUser.name}`}

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post(`${REACT_APP_SERVER_URL}/storylines`, infoForStoryline)
        .then((response) => {
            console.log(response)
            // history.goBack()
        })
        .catch((error) => {
            console.log("===> Error on NewStoryline -- in handleSubmit()", error);
            alert("Something went wrong Please try again");
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="box">
                    <h1>Create New Storyline</h1>
                    <input
                    type="text"
                    name="storylineName"
                    placeholder="Storyline Name"            
                    className="form_input"
                    onChange={handleStorylineName}                    
                    />            
                    <button type="submit" id="btn">Submit</button>
                    <button className="btn" onClick={() => history.goBack()}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default NewStoryline;
