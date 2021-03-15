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
      <div className="container">
        <div className="background"></div>
        <div className="content">
          <p>{name}'s Creations</p>
          <StorylinesList user={props.user} />
        </div>
        <div className="actions">
          <button>
            <Link to={{ pathname: "/newstoryline", state: props.user }}>
              New Storyline
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
