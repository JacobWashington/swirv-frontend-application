import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StorylinesList from "../storylines/storylinesList/StorylinesList";
import "./Profile.css";

const { REACT_APP_SERVER_URL } = process.env;

const Profile = (currentUser) => {
  const [authId, setAuthId] = useState(currentUser.user.id);
  const [name, setName] = useState(currentUser.user.name);

  return <>
   <div className="container">
      <div className="background"></div>
      <div className="content">
        <p>{name}'s Creations</p>
        {authId ? <StorylinesList auth={authId} /> : null}
      </div>
    </div>
  
  </>;
};

export default Profile;
