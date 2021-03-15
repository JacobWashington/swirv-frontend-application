import StorylineCard from "../storylineCard/StorylineCard";
import { useEffect, useState } from "react";
import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

const StorylinesList = (props) => {
  const [storiesArr, setStoriesArr] = useState([]);

  let mappedStoryline;

  // search for all storylines where storyline.authId == authId
  // assign stories to state

  let user;
  console.log('************ USER *********', props)
  if (props.currentUser) {
      user = props.currentUser
  } else {
      user = props.user.id
  }
  console.log(user)

  useEffect(() => {
    const fetchStories = async (req, res) => {
        console.log("************ YOU MADE IT **************")
        const stories = await axios.get(
          `${REACT_APP_SERVER_URL}/storylines/all/${user}`
          );
          console.log("RIGHT BEFORE SETSTORIES")
          setStoriesArr(stories.data);
          console.log("RIGHT AFTER SETSTORIES")
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
      <ul>{mappedStoryline}</ul>
    </div>
  );
};

export default StorylinesList;
