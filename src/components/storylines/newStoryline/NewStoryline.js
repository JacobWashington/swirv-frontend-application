import {React, useState} from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
const {REACT_APP_SERVER_URL} = process.env;


const NewStoryline = (props) => {
    console.log("PROPS >>>", props)
    const userId = props.location.state.id
    console.log("USER ID >>>>>", userId)
    const [storylineName, setStorylineName] = useState("");
    let history = useHistory();
    
    const handleStorylineName = (e) => {
        setStorylineName(e.target.value)
    }

    const infoForStoryline = {authId: userId, title:storylineName}

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post(`${REACT_APP_SERVER_URL}/storylines`, infoForStoryline)
        .then((response) => {
            console.log(response)
            history.goBack()
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
                    <button className="btn" onClick={() => history.goBack()}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default NewStoryline;
