import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import Storylines from './Storylines';
import Storyline from './Storyline';
import Episode from './Episode';

const StorylineView = () => {

    const [storylines, setStorylines] = useState([])

    useEffect(() => {
        const fetchStories = async () => {
          const response = await axios.get('http://localhost:8000/swirv/storylines/allfornone');
          const data = response.data;
 
          setStorylines(data);

        }
        fetchStories();
    }, [])

    console.log(storylines)

    return (
        <div>
        <Route exact path='/storylines' render={(props)=><Storylines {...props} storylines={storylines} />} />
        <Route exact path='/storyline' render={(props)=><Storyline {...props} storylines={storylines} />} />
        <Route exact path="/episode" component={Episode} />
        </div>
    );
}

export default StorylineView;
