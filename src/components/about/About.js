import React from "react";
import "./About.css";
import logo from "../../logo.png";
const About = () => {
  return (
    <div className="container">
      <div className="content">
        <img className="img" src={logo} height="300px" alt="swirv" />
        <p className="description">
          Take control of any story! Swirv gives every reader the power to
          determine the story’s end. Whether you’d wished the daring underdog
          hadn’t overcome his conquerors, or that the damsel had not been so
          distressed, take the reins and make any story your own. Like what you
          see? Check out our <a href="https://teespring.com/swirv?pid=212&cid=5822" target="_blank">Merch Store!</a>
        </p>
      </div>
      {/* <div className="background"></div> */}
    </div>
  );
};

export default About;
