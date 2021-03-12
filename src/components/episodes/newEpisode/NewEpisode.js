import React, { useEffect, useState } from 'react';

const NewEpisode = (props) => {
    const [episodeName, setEpisodeName] = useState("");
    const [content, setContent] = useState("")
    const [storylineId, setStorylineId] = useState("")

    

    const handleEpisodeName = (e) => {
        setEpisodeName(e.taget.value)
    }
    const handleContent = (e) => {
        setContent(e.taget.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setStorylineId(props.storylineId)
        let payload = {storyLineId: storylineId, title: episodeName, content: content}
        axios
        .post(`${REACT_APP_SERVER_URL}/episodes/`, payload)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log("===> Error on NewEpisode -- in handleSubmit()", error);
            alert("Something went wrong Please try again");
        });
    }

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
                    name="episodeName"
                    placeholder="Episode Name"            
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
