import React from 'react';
import { Link } from 'react-router-dom';

const Storylines = (props) => {
    // const { title, authId } = props.storyline;
    console.log("This", props)

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
    console.log(">>>storyline<<<", storyline)
    console.log(">>>Checking storyline[0]<<<", props.storylines[0])
    return (
        <div className="link">
           {storyline.length ? storyline : <p>Loading...</p>}
        </div>
    )
}

export default Storylines;