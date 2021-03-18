import "./MeetTheTeam.css";
import { CardDeck } from "reactstrap";
import TeamMemberCard from "./teamMemberCard/TeamMemberCard";

const MeetTheTeam = () => {
  const theTeam = ["JacobWashington", "Fletch8", "y4050"];

  let mappedTeamMember = theTeam.map((username, index) => {
    return <TeamMemberCard username={username} key={index} />;
  });

  return (
    <div className="card-container">
      <CardDeck>{mappedTeamMember}</CardDeck>
    </div>
  );
};

export default MeetTheTeam;
