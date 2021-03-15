import StorylineCard from "../storylineCard/StorylineCard";
import { useEffect, useState } from "react";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const StorylinesList = (props) => {
  const [authId, setAuthId] = useState(props.auth);
  const [storiesArr, setStoriesArr] = useState([]);

  let mappedStoryline;

  // search for all storylines where storyline.authId == authId
  // assign stories to state
  useEffect(() => {
    const fetchStories = async (req, res) => {
      if (props.auth) {
        const stories = await axios.get(
          `${REACT_APP_SERVER_URL}/storylines/all/${props.auth}`
          );
          setStoriesArr(stories.data);
      } else {
        const stories = await axios.get(
          `${REACT_APP_SERVER_URL}/storylines/index`
          );
          setStoriesArr(stories.data);
      }
    };
    fetchStories();
  }, []);

  // maps each item in storiesArr, returning a dynamic card component for each story
  if (storiesArr.length > 0) {
    mappedStoryline = storiesArr.map((storyline, index) => {
      return <StorylineCard id={storyline._id} key={index} />;
    });
  }

  return (
    <div className="storylines-list">
      <h3>Storylines:</h3>
      <ul>{storiesArr.length > 0 ? mappedStoryline : null}</ul>
    </div>
  );
};

export default StorylinesList;
