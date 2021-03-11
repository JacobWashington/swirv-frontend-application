import React from 'react';
import "./Profile.css"

const Profile = (props) => {
    const {  name, email } = props.user
    return (
        <div>
            <br />
            <h2>{name}'s Profile</h2>
            <br />
            <p>name: {name}</p>
            <p>email: {email}</p>
        </div>
    );
}

export default Profile;