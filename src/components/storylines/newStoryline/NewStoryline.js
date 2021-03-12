import {React, useState, useEffect} from 'react';
import axios from 'axios'
const {REACT_APP_SERVER_URL} = process.env;


const NewStoryline = () => {
    const [storylineName, setStorylineName] = useState("");
    
    const handleStorylineName = (e) => {
        setStorylineName(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post(`${REACT_APP_SERVER_URL}/storylines`, storylineName)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log("===> Error on NewStoryline -- in handleSubmit()", error);
            alert("Something went wrong Please try again");
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="box">
                    <h1>Create New Storyline</h1>
                    <input
                    type="text"
                    name="storylineName"
                    placeholder="Storyline Name"            
                    className="form_input"
                    onChange={handleStorylineName}                    
                    />            
                    <button type="submit" id="btn">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default NewStoryline;
