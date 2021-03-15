import "./TGA.css";
import axios from "axios";
import { useState, useEffect } from "react";
import StorylinesList from "../storylines/storylinesList/StorylinesList";
const { REACT_APP_SERVER_URL, TGA_ID } = process.env;

const TGA = (props) => {
  console.log("TGA CURRENT USER >>>", props.currentUser.id)
  // !!!!!!!!!!! UPDATE BEFORE DEPLOYMENT !!!!!!!!!!! //
  // const [authId, setAuthId] = useState(props.currentUser.id);
  const [authId, setAuthId] = useState('604db56873b61c2f301ed199');

  useEffect(() => {
    const fetchTGA = async (req, res) => {
      // !!!!!!!!!!! UPDATE BEFORE DEPLOYMENT !!!!!!!!!!! //
      const TGA = await axios.get(
        `${REACT_APP_SERVER_URL}/users/604db56873b61c2f301ed199`
      );
      console.log("!!!!!!!! INSIDE TGA !!!!!!!!!!!", TGA);
      console.log(TGA.data);
      setAuthId(TGA.data._id);
    };
    fetchTGA();
  }, []);


  return (
    <div className="container">
      <div className="background"></div>
      <div className="content">
        <p>The Great Attractor</p>
        <StorylinesList currentUser={authId} />
      </div>
    </div>
  );
};

export default TGA;