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

  return (
    <>
      <div className="container">
        <div className="background"></div>
        <div className="content">
          <p>{name}'s Creations</p>
          <StorylinesList auth={props.user._id} />
        </div>
        <div className="actions">
          <button>
            <Link to={{ pathname: "/newstoryline", state: props.user._id }}>BUTTON</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
