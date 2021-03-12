import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Profile.css"

const Profile = (props) => {

    const [storylines, setStorylines] = useState([])
    const [authId, setAuthId] = useState("");
    useEffect(() => {
        const fetchStories = async () => {
            setAuthId(props.user.id)
            const user = { authId: props.user.id}
            const response = await axios.post('http://localhost:8000/swirv/storylines/fromuser', user);
            const data = response.data;
 
            setStorylines(data);

        }
        fetchStories();
    }, [])

    console.log("CHECKING",storylines)
    console.log("props_authId >>>>", authId)
    const {  name, email } = props.user

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
            <h2>{name}'s Profile</h2>
            <br />
            <p>name: {name}</p>
            <p>email: {email}</p>
            <h3>Your Storylines:</h3>
            {storyline.length ? storyline : <p>Loading...</p>}
        </div>
    );
}

export default Profile;