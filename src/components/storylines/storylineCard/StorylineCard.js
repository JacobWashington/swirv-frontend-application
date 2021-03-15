import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './StorylineCard.css'
import axios from "axios";

const { REACT_APP_SERVER_URL } = process.env;

// Will return a clickable card component displaying a storyline's title

const StorylineCard = (props) => {
  const [title, setTitle] = useState("");
  const [storylineId, setStorylineId] = useState("");

  useEffect(() => {
    const fetchStoryline = async (req, res) => {
      await setStorylineId(props.id);
      const storyline = await axios.get(
        `${REACT_APP_SERVER_URL}/storylines/${props.id}`
      );
      await setTitle(storyline.data.title);
    };
    fetchStoryline();
  }, []);

  return (
    <>
      <li>
        <Link
          to={{
            pathname: `/storylines/${title}/${storylineId}`,
            state: storylineId,
          }}
        >
          {title ? <p className="astory">{title}</p> : <p>Untitled Story</p>}
        </Link>
      </li>
    </>
  );
};

export default StorylineCard;
