import React from 'react';
import StorylinesList from '../storylines/storylinesList/StorylinesList'

const FeaturedList = () => {
    return (
        <div className="container">
        <div className="background"></div>
        <div className="content">
          <p>Featured Storylines</p>
            <StorylinesList />
        </div>
      </div>
    );
}

export default FeaturedList;
