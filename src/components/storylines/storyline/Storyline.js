import "./Storyline.css";
import { useState, useEffect } from "react";
import axios from "axios";
import EpisodesList from "../../episodes/episodesList/EpisodesList";

const { REACT_APP_SERVER_URL } = process.env;

// if authId === currentUserId, option to delete, update, offer, branch
// if authId != currentUserId, option to branch

const Storyline = (props) => {
  const [storylineId, setStorylineId] = useState("");
  const [storyline, setStoryline] = useState({});

  useEffect(async () => {
    // grab storylineId from props and set it in state
    await setStorylineId(props.id);

    // grab storyline obj from database and set it in state
    const fetchStoryline = async (req, res) => {
      const storyline = await axios.get(
        `${REACT_APP_SERVER_URL}/storylines/${storylineId}`
      );
      setStoryline(storyline);
    };
    fetchStoryline();
  }, []);

  const handleOffering = async () => {
    alert('Offering firing')
    let offering = {
      storylineId: storylineId,
      title: storyline.title,
    };

    await axios.post(`${REACT_APP_SERVER_URL}/theGreatAttractor`, offering);
    alert(`${storyline.title} has been consumed by The Great Attractor!`);

    // REDIRECT
  };

  const handleBranch = async () => {
    let branchData = {
      storylineId: storylineId,
      title: storyline.title,
      _id: props.user.id,
    };
    await axios.post(
      `${REACT_APP_SERVER_URL}/storylines/createbranch`,
      branchData
    );

    // REDIRECT
  };

  const handleDelete = async () => {
    await axios.post(`${REACT_APP_SERVER_URL}/storylines/del/${storylineId}`);
  };

  const isAuthor = storyline.authId === props.user._id;

  return (
    <div>
      <p>{storyline.title}</p>
      <div className="episodes-list">
        <p>Episodes:</p>
        <EpisodesList id={storylineId} />
      </div>
      <button>New Episode</button>
      <button>Edit Episodes</button>
      <p>
        No longer want this storyline? Make an{" "}
        <div className="offering" onClick={handleOffering}>
          offering to The Great Attractor!
        </div>
      </p>
    </div>
  );
};

export default Storyline;
