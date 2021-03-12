import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import jwt_decode from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";
const { REACT_APP_SERVER_URL } = process.env;


const Storyline = (props) => {
    
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

    console.log("CURRENTUSER>>>>>" ,currentUser)

    const [epId, setEpId] = useState([])
    useEffect(() => {
        if(props.location.state.episodes){
            setEpId(props.location.state.episodes)
        }
    }, [props.location.state.episodes])
    console.log("Storyline.js - PROPS >>>>", props)


    let i = 0;
    const episodes = epId.map((ep, index)=> {
        i+=1
        return (
            <div className="link">
                <Link to={{
                    pathname: "/episode",
                    state: ep
                }}
                key={index}
                >
                    <p>Episode - {i}</p>
                </Link>
            </div>
        )
    })



    const storylineTitle = props.location.state.title

    console.log("Storyline.js - EPID >>>>>", epId)
    let history = useHistory();

    const storylineId = {storylineId: props.location.state._id}
    console.log("CHEKCING IF BRANCHED", props)
    
    const handleOffer = async ()=> {
        if (props.location.state.branchedFromStorylineId){
            alert("Cannot offer storylines obtained by branching")
        } else {
            await axios.post('http://localhost:8000/swirv/theGreatAttractor', storylineId)
            // axios.post(`${REACT_APP_SERVER_URL}/theGreatAttrac]tor`, storylineId)
            alert("Storyline was offered!")
            history.goBack()
        }
    }

    const forBranch = {storylineId: props.location.state._id,title: props.location.state.title, __id:currentUser.id}
    console.log("FOR BRANCH >>>>", forBranch)

    const handleBranch = async ()=> {
        await axios.post('http://localhost:8000/swirv/storylines/createbranch', forBranch)
        // axios.post(`${REACT_APP_SERVER_URL}/theGreatAttrac]tor`, storylineId)
        alert("Storyline was branched!")
        history.goBack()
    }
    
    const handleDelete = async ()=> {
        await axios.post(`http://localhost:8000/swirv/storylines/del/${props.location.state._id}`)
        // axios.post(`${REACT_APP_SERVER_URL}/theGreatAttrac]tor`, storylineId)
        alert("Storyline was deleted!")
        history.goBack()
    }

    const offerDeleteOrBranch = (props.location.state.authId === currentUser.id)


    return (
        <div>
            <h2>Storyline: {storylineTitle}</h2>
            <h3>Episodes:</h3>
            {episodes}
            <br />
            {offerDeleteOrBranch ? <button className="btn" onClick={() => handleOffer()}>Offer</button> :
            <button className="btn" onClick={() => handleBranch()}>Branch</button>}
            <br />
            {offerDeleteOrBranch ? <button className="btn" onClick={() => handleDelete()}>Delete Storyline</button> : <p></p>}
            <br />
            <button className="btn" onClick={() => history.goBack()}>Return</button>
        </div>
    );
}

export default Storyline;