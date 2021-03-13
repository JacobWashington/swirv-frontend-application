import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import NewStoryline from '../storylines/newStoryline/NewStoryline'
import "./Profile.css"

const { REACT_APP_SERVER_URL } = process.env;

const Profile = (props) => {
    const [storylines, setStorylines] = useState([])
    const [authId, setAuthId] = useState("");
    useEffect(() => {
        const fetchStories = async () => {
            setAuthId(props.user.id)
            const user = { authId: props.user.id}
            const response = await axios.post(`${REACT_APP_SERVER_URL}/storylines/fromuser`, user);
            const data = response.data;
            setStorylines(data);
        }
        fetchStories();
    }, [])

    const handleDestroy = () => {
        axios
        .get(`${REACT_APP_SERVER_URL}/theGreatAttractor/del`)
        .then((response) => {
            alert("CONSUMED ALL STORYLINES")
            console.log(response)
        })
        .catch((error) => {
            console.log("===> Error on NewEpisode -- in handleSubmit()", error);
            alert("Something went wrong Please try again");
        });
    }

    console.log("props_authId >>>>", authId)
    const {  name } = props.user

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
    const checktga = (props.user.email === "tga@email.com")
    console.log("CHECKING TGA >>>", checktga)
    return (
        <div>
            <br />
            <h2>{name}'s Page</h2>
            <br />
            <h3>Your Storylines:</h3>
            {storyline.length ? storyline : <p>Empty...</p>}
            <Route path="/newstoryline" component={NewStoryline} />
            <Link to={{
                    pathname: "/newstoryline",
                    state: props.user
                }}>
                    <h3>Create New Story</h3>
            </Link>
            {checktga ?  <button className="btn" onClick={() => handleDestroy()}>CONSUME OFFERINGS</button>:
            <p>nope</p>}
        </div>
    );
}

export default Profile;