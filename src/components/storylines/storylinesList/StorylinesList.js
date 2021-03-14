import StorylineCard from "../storylineCard/StorylineCard";
import { useEffect, useState } from "react";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env

const StorylinesList = (props) => {
  const [authId, setAuthId] = useState("");
  const [storiesArr, setStoriesArr] = useState([]);

  let mappedStoryline;

  // search for all storylines where storyline.authId == authId
  // assign stories to state
  useEffect(() => {
    // const fetchStories = async (req,res) => {
    //   const stories = await axios.get(`${REACT_APP_SERVER_URL}/storylines/all/${authId}`);
    //   setStoriesArr(stories.data);
    // }
    // fetchStories();
  }, []);

  // maps each item in storiesArr, returning a dynamic card component for each story
if(storiesArr.length > 0){  mappedStoryline = storiesArr.map((storyline, index) => {
    return <StorylineCard id={storyline.id} index={index} />;
  });}

  return (
    <div className="storylines-list">
      <h3>Storylines:</h3>
      <ul>{storiesArr.length > 0 ? mappedStoryline : null}</ul>
    </div>
  );
};

export default StorylinesList;
