import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";

const { REACT_APP_SERVER_URL } = process.env;

const EpisodeView = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authId, setAuthId] = useState("");
  const [episodeId, setEpisodeId] = useState("");
  const [userCanDelete, setUserCanDelete] = useState(false);

  useEffect(() => {
    let token;
    if (!localStorage.getItem("jwtToken")) {
      setIsAuthenticated(false);
      console.log("====> Authenticated is now FALSE");
    } else {
      token = jwt_decode(localStorage.getItem("jwtToken"));
      setAuthToken(localStorage.getItem("jwtToken"));
      setCurrentUser(token);
    }
  }, []);

  useEffect(() => {
    setEpisodeId(props.id);
    const fetchEpisode = async (req, res) => {
      const episode = await axios.get(
        `${REACT_APP_SERVER_URL}/episodes/${episodeId}`
      );
      setTitle(episode.title);
      setContent(episode.content);
      setAuthId(episode.authId);

      // checks if currentUser and authId match, sets delete
      currentUser.id === episode.authId ? setUserCanDelete(true) : null;
    };
    fetchEpisode();
  }, []);

  const handleDelete = async () => {
    const payload = { episodeId: episodeId };
    await axios.post(`${REACT_APP_SERVER_URL}/episodes/del/${epId}`, payload);
    alert("Episode was deleted!");
    // add in a redirect
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      {userCanDelete ? (
        <button className="btn" onClick={handleDelete}>
          Delete Episode
        </button>
      ) : null}
      <button className="btn" onClick={() => history.goBack()}>
        Return
      </button>
    </div>
  );
};

export default EpisodeView;
