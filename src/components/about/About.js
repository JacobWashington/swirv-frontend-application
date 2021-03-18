import MeetTheTeam from "./meetTheTeam/MeetTheTeam";
import "./About.css";
import logo from "../../logo.png";
const About = () => {
  return (
    <div className="about-container">
      <div className="content">
        <div className="image-container">
          <img className="img" src={logo} alt="swirv logo" />
        </div>
        <div className="description-container">
          <p className="description">
            Take control of any story! Swirv gives every reader the power to
            determine the story’s end. Whether you’d wished the daring underdog
            hadn’t overcome his conquerors, or that the damsel had not been so
            distressed, take the reins and make any story your own.
          </p>
        </div>
        <div className="team-container">
          <h2>Meet the Team</h2>
          <MeetTheTeam />
        </div>
      </div>
    </div>
  );
};

export default About;
