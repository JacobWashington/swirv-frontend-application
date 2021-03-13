import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TGA = (props) => {

    const [storylines, setStorylines] = useState([])
    useEffect(() => {
        const fetchStories = async () => {
            const response = await axios.get('http://localhost:8000/swirv/theGreatAttractor');
            const data = response.data;
 
            setStorylines(data);
        }
        fetchStories();
    }, [])

    console.log("CHECKING",storylines)

    const storyline = storylines.map((storyline, index)=> {
        return (
            <div className="link">
                <Link to={{
                    pathname: "/storyline",
                    state: storyline
                }}
                key={index}
                >
                    <h3>{storyline.title}</h3>
                </Link>
            </div>
        )
    })

    return (
        <div>
            <br />
            <h2>The Great Attractor</h2>
            <br />
            <h3>Storylines:</h3>
            {storyline.length ? storyline : <p>Empty...</p>}
        </div>
    );
}

export default TGA;