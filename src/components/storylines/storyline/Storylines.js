import React from 'react';
import { Link } from 'react-router-dom';

const Storylines = (props) => {
    // const { title, authId } = props.storyline;
    console.log("Storylines.js - PROPS >>>>", props)

    const storyline = props.storylines.map((storyline, index)=> {
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
    console.log("Storylines.js - STORYLINE >>>>", storyline)

    return (
        <div className="link">
            <h3>Storylines :</h3>
           {storyline.length ? storyline : <p>Empty...</p>}
        </div>
    )
}

export default Storylines;