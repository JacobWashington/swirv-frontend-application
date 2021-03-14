import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";

const { REACT_APP_SERVER_URL } = process.env;

const Episode = (state) => {
    const epId = state.location.state;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [auth, setAuth] = useState('');
    

    useEffect(() => {
        const fetchEpInfo = async () => {
          const response = await axios.get(`${REACT_APP_SERVER_URL}/episodes/${epId}`);
          setTitle(response.data.title)
          setContent(response.data.content)
          console.log(response)
          setAuth(response.data.authId)
        }
        fetchEpInfo();
    }, [epId])

    const [currentUser, setCurrentUser] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(true);
  
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

    const handleDelete = async ()=> {
      const payload = {episodeId : epId}
      await axios.post(`${REACT_APP_SERVER_URL}/episodes/del/${epId}`, payload)
      alert("Episode was deleted!")
      history.goBack()
      history.goBack()
  }
    const canDelete = (auth === currentUser.id)
    let history = useHistory();

    console.log("STATE >>>", state)
    return (
        <div>
            <br />
            <h2>Title: {title}</h2>
            <br />
            <p>{content}</p>
            <br />
            {canDelete ? <button className="btn" onClick={() => handleDelete()}>Delete Episode</button> : <p></p>}
            <br />
            <button className="btn" onClick={() => history.goBack()}>Return</button>
        </div>
    );
}

export default Episode;