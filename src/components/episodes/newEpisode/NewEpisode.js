import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
const {REACT_APP_SERVER_URL} = process.env;

const NewEpisode = (props) => {
    const [episodeName, setEpisodeName] = useState("");
    const [content, setContent] = useState("");
    const [storylineId, setStorylineId] = useState("");
    let history = useHistory();

    console.log("PROPS >>_>>", props)
    

    const handleEpisodeName = (e) => {
        setEpisodeName(e.target.value)
    }
    const handleContent = (e) => {        setContent(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const creating = {authId: props.location.state.authId, storylineId: props.location.state._id, title: episodeName, content: content}
        
        let payload = {storyLineId: "6046bc013ea2e13bbc938917", title: episodeName, content: content};
        axios
        .post(`${REACT_APP_SERVER_URL}/episodes/`, creating)
        .then((response) => {
            console.log(response)
            history.goBack()
            history.goBack()

        })
        .catch((error) => {
            console.log("===> Error on NewEpisode -- in handleSubmit()", error);
            alert("Something went wrong Please try again");
        });
    }
    
    console.log("NEWEPISODE.js - PROPS.USER>>>>>", props)
    useEffect(()=> {
        setStorylineId(props.storylineId)
    },[])
    
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
