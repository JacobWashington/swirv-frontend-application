import "./TGA.css";
import axios from "axios";
import { useState, useEffect } from "react";
import StorylinesList from "../storylines/storylinesList/StorylinesList";
const { REACT_APP_SERVER_URL, TGA_ID } = process.env;

const TGA = (props) => {
  // !!!!!!!!!!! UPDATE BEFORE DEPLOYMENT !!!!!!!!!!! //
  // const [authId, setAuthId] = useState(props.currentUser.id);

  let greatAttractor;
  if (TGA_ID) {
    greatAttractor = TGA_ID;
  } else greatAttractor = "the_great_attractor";

  return (
    <div className="container">
      <div className="background"></div>
      <div className="content">
        <p>The Great Attractor</p>
        <StorylinesList currentUser={greatAttractor} />
      </div>
    </div>
  );
};

export default TGA;
