import EpisodeCard from "../episodeCard/EpisodeCard";
import { useEffect, useState } from "react";
import axios from "axios";

const EpisodesList = (props) => {
  const [storylineId, setStorylineId] = useState("");
  const [episodesArr, setEpisodesArr] = useState([]);

  // search for all episodes where episode.storylineId == storylineId
  // assign episodes to state
  useEffect(async () => {
    await setStorylineId(props.id);
    const episodes = await axios.get(`${storylineId}`);
    setEpisodesArr(episodes);
  });

  // maps each item in episodesArr, returning a dynamic card component for each episode
  const mappedEpisode = episodesArr.map((episode, index) => {
    return <EpisodeCard id={episode.id} index={index} />;
  });

  return (
    <div className="episodes-list">
      <h3>Episodes:</h3>
      <ul>{mappedEpisode}</ul>
    </div>
  );
};

export default EpisodesList;
