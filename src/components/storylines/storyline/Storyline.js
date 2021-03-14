import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import jwt_decode from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";
import EpisodesList from "../../episodes/episodesList/EpisodesList";


const { REACT_APP_SERVER_URL } = process.env;

// if authId === currentUserId, option to delete, update, offer, branch
// if authId != currentUserId, option to branch

const Storyline = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [storylineId, setStorylineId] = useState("");
  const [storyline, setStoryline] = useState({});

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

  useEffect(async () => {
      // grab storylineId from props and set it in state
    await setStorylineId(props.id);

    // grab storyline obj from database and set it in state
    const fetchStoryline = async (req, res) => {
      const storyline = await axios.get(
        `${REACT_APP_SERVER_URL}/storylines/${storylineId}`
      );
      setStoryline(storyline)
    };
  }, []);

  const handleOffering = async () => {
    let offering = {
        storylineId: storylineId,
        title: storyline.title,
      };

    await axios.post(`${REACT_APP_SERVER_URL}/theGreatAttractor`, offering)
    alert(`${storyline.title} has been consumed by The Great Attractor!`)

    // redirect...
  }

  const handleBranch = async () => {
      let branchData = {
          storylineId: storylineId,
          title: storyline.title,
          _id: currentUser.id
      };
    await axios.post(
      `${REACT_APP_SERVER_URL}/storylines/createbranch`,
      branchData
    );

    // redirect...
  };

  const handleDelete = async () => {
    await axios.post(
      `${REACT_APP_SERVER_URL}/storylines/del/${storylineId}`
    );
  };

  const isAuthor = storyline.authId === currentUser.id;

  return (
    <div>
      <p>{storyline.title}</p>
      <p>Episodes:</p>
      <EpisodesList id={storylineId} />
    </div>
  );
};

export default Storyline;
