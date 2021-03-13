import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import Storylines from './Storylines';
import Storyline from './Storyline';
import Episode from './Episode';

const { REACT_APP_SERVER_URL } = process.env;

const StorylineView = () => {

    const [storylines, setStorylines] = useState([])

    

    useEffect(() => {
        const fetchStories = async () => {
          const response = await axios.get(`${REACT_APP_SERVER_URL}/storylines/allfornone`);
          const data = response.data;
 
          setStorylines(data);

        }
        fetchStories();
    }, [])

    return (
        <div>
        <Route exact path='/storylines' render={(props)=><Storylines {...props} storylines={storylines} />} />
        <Route exact path='/storyline' render={(props)=><Storyline {...props} storylines={storylines} />} />
        <Route exact path="/episode" component={Episode} />
        </div>
    );
}

export default StorylineView;
