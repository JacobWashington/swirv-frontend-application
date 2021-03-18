import axios from "axios";
import { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

const TeamMemberCard = (props) => {
  const [teamMember, setTeamMember] = useState({});

  useEffect(() => {
    const fetchTeamMember = async (req, res) => {
      const memberObj = await axios.get(
        `https://api.github.com/users/${props.username}`
      );
      await setTeamMember(memberObj.data);
    };
    fetchTeamMember();
    console.log(teamMember)
  }, []);

  return (
    <>
      <Card>
        <CardImg
          top
          width="100%"
          src={teamMember.avatar_url}
          alt={`Image of ${
            teamMember.name ? teamMember.name : teamMember.login
          }. A member of the development team at Swirv.`}
        />
        <CardBody>
          <CardTitle tag="h5">
            <a href={teamMember.html_url}>{teamMember.name ? teamMember.name : teamMember.login}</a>
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {teamMember.bio}
          </CardSubtitle>
        </CardBody>
      </Card>
    </>
  );
};

export default TeamMemberCard;
