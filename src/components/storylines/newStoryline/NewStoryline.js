import {React, useState, useEffect } from 'react';
import axios from 'axios'
const {REACT_APP_SERVER_URL} = process.env;


const NewStoryline = (props) => {
    const [storylineName, setStorylineName] = useState("");

    
    const handleStorylineName = (e) => {
        setStorylineName(e.target.value)
    }

    const payload = {authId: props.currentUser._id, title:`${storylineName}`}

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post(`${REACT_APP_SERVER_URL}/storylines`, payload)
        .then((response) => {
            // REDIRECT
        })
        .catch((error) => {
            console.log("===> Error on NewStoryline -- in handleSubmit()", error);
            alert("Something went wrong Please try again");
        });
    }

    const goBack = (e) => {
        // REDIRECT
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="box">
                    <h1>Create New Storyline</h1>
                    <input
                    type="text"
                    name="storylineName"
                    placeholder="Storyline Name"            
                    className="form_input"
                    onChange={handleStorylineName}                    
                    />            
                    <button type="submit" id="btn">Submit</button>
                    <button className="btn" onClick={goBack}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default NewStoryline;
