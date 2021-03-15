import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
const {REACT_APP_SERVER_URL} = process.env;

const NewEpisode = (props) => {
    const [episodeName, setEpisodeName] = useState("");
    const [content, setContent] = useState("");
    let history = useHistory();

    console.log("PROPS >>_>>", props)
    

    const handleEpisodeName = (e) => {
        setEpisodeName(e.target.value)
    }
    const handleContent = (e) => {        
        setContent(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {authId: props.currentUser._id, storylineId: props.storyline._id, title: episodeName, content: content}
        
        axios
        .post(`${REACT_APP_SERVER_URL}/episodes/`, payload)
        .then((response) => {
            console.log(response)
            // REDIRECT 

        })
        .catch((error) => {
            console.log("===> Error on NewEpisode -- in handleSubmit()", error);
            alert("Something went wrong Please try again");
        });
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="box">
                    <h1>Create New Episode</h1>
                    <input
                    type="text"
                    name="episodeName"
                    placeholder="Episode Name"            
                    className="form_input"
                    onChange={handleEpisodeName}                    
                    /> 
                      <input
                    type="textarea"
                    name="episodeContent"
                    placeholder="Episode Content"            
                    className="form_input"
                    onChange={handleContent}                    
                    />            
                    <button type="submit" id="btn">Submit</button>
                </div>
            </form>            
        </div>
    );
}

export default NewEpisode;
