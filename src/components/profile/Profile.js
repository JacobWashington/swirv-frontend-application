import React from 'react';
import "./Profile.css"

const Profile = (props) => {
    const {  name, email } = props.user
    return (
        <div>
            <p>name: {name}</p>
            <p>email: {email}</p>
        </div>
    );
}

export default Profile;