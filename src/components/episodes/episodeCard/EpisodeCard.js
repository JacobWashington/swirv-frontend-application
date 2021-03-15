import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Will return a clickable card component displaying an episode's title

const EpisodeCard = (props) => {
  const [title, setTitle] = useState("");
  const [episodeId, setEpisodeId] = useState("");

  useEffect(async () => {
    const setId = await setEpisodeId(props.id);
    const fetchEpisode = async (req, res) => {
      const episode = await axios.get(`${episodeId}`);
      setTitle(episode.title);
    };
  }, []);

  return (
    <>
      <li key={props.index}>
        <Link
          to={{
            pathname: `/episode/${title}/${episodeId}`,
            state: episodeId,
          }}
        >
          <p>{title}</p>
        </Link>
      </li>
    </>
  );
};

export default EpisodeCard;
