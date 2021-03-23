import React from 'react';
import StorylinCard from "../storylines/storylineCard/StorylineCard";
import EpisodeCard from "../episodes/episodeCard/EpisodeCard";
import StorylineList from "../storylines/storylinesList/StorylinesList";

const FeaturedList = (props) => {
  console.log("#######################",props.currentUser)
    return (
        <div className="featuredlist-container">
        <div className="featuredlist-background"></div>
        <div className="featuredlist-content">
          <StorylineList currentUser={props.currentUser.id}/>
        </div>
      </div>
    );
}

export default FeaturedList;
