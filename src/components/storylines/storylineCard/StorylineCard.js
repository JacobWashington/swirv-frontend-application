import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const { REACT_APP_SERVER_URL } = process.env;

// Will return a clickable card component displaying a storyline's title

const StorylineCard = (props) => {
  const [title, setTitle] = useState("");
  const [storylineId, setStorylineId] = useState("");

  useEffect(async () => {
    await setStorylineId(props.id);
    const fetchStoryline = async (req, res) => {
      const storyline = await axios.get(`${REACT_APP_SERVER_URL}/storylines/${storylineId}`);
      setTitle(storyline.title);
    };
  }, []);

  return (
    <>
      <li key={props.index}>
        <Link
          to={{
            pathname: `/storylines/${title}/${storylineId}`,
            state: storylineId,
          }}
        >
          <p>{title}</p>
        </Link>
      </li>
    </>
  );
};

export default StorylineCard;
