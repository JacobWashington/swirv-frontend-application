import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StorylinesList from "../storylines/storylinesList/StorylinesList";
import "./Profile.css";

const { REACT_APP_SERVER_URL } = process.env;

const Profile = (props) => {
  const [name, setName] = useState(props.user.name);

  const addStoryline = (e) => {
    // REDIRECT
  };

  console.log("-----PROPS-----", props)
  return (
    <>
      <div className="profile-container">
        <div className="profile-background"></div>
        <div className="profile-content">
          <p>{name}'s Creations</p>
          <StorylinesList user={props.user} />
          <div className="profile-actions">
          <button className="btn">
            <Link to={{ pathname: "/newstoryline", state: props.user }}>
              New Storyline
            </Link>
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
