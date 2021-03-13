import { Link, Route, useHistory  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import jwt_decode from "jwt-decode";
import setAuthToken from "../../../utils/setAuthToken";
import NewEpisode from '../../episodes/newEpisode/NewEpisode'

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

    const offering = {storylineId: props.location.state._id, title: `${String(props.location.state.title)} - TGA`}

    const handleOffer = async ()=> {
        if (props.location.state.branchedFromStorylineId){
            // if it was branched instead of created by user
            alert("⚠️Cannot offer storylines obtained by branching")
        } else {
            alert("Storyline was Consumed by ⚫️The Great Attractor⚫️!")
            history.goBack()
            console.log("clicked >>>>")
            await axios.post(`${REACT_APP_SERVER_URL}/theGreatAttractor`, offering)
            // axios.post(`${REACT_APP_SERVER_URL}/theGreatAttrac]tor`, storylineId)
        }
    }

    const forBranch = {storylineId: props.location.state._id,title: (`${props.location.state.title} - branched by ${currentUser.name}`), __id:currentUser.id}
    console.log("FOR BRANCH >>>>", forBranch)

    const handleBranch = async ()=> {
        await axios.post(`${REACT_APP_SERVER_URL}/storylines/createbranch`, forBranch)
        // axios.post(`${REACT_APP_SERVER_URL}/theGreatAttrac]tor`, storylineId)
        alert("Storyline was branched!")
        history.goBack()
    }
    
    const handleDelete = async ()=> {
        await axios.post(`${REACT_APP_SERVER_URL}/storylines/del/${props.location.state._id}`)
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
            <Route path="/newepisode" component={NewEpisode} />
            {offerDeleteOrBranch ? 
            <Link to={{
                    pathname: "/newepisode",
                    state: props.location.state
                }}>
                    <h3>Create New Episode</h3>
            </Link> : <p></p>}
           

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