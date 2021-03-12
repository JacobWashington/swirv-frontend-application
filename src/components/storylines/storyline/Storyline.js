import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
const { REACT_APP_SERVER_URL } = process.env;



const Storyline = (props) => {

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
                    <p>Episode {i}</p>
                </Link>
            </div>
        )
    })

    const storylineTitle = props.location.state.title

    console.log("Storyline.js - EPID >>>>>", epId)
    let history = useHistory();

    const storylineId = {storylineId: props.location.state._id}
    
    const handleOffer = async ()=> {
        const offering = await axios.post('http://localhost:8000/swirv/theGreatAttractor', storylineId)
        // axios.post(`${REACT_APP_SERVER_URL}/theGreatAttrac]tor`, storylineId)
        console.log("OFFERING >>>" ,offering)
        alert("Storyline was offered!")
        history.goBack()
    }

    return (
        <div>
            <h2>Storyline: {storylineTitle}</h2>
            <h3>Episodes:</h3>
            {episodes}
            <br />
            <button className="btn" onClick={() => handleOffer()}>Offer</button>
            <br />
            <button className="btn" onClick={() => history.goBack()}>Return</button>
        </div>
    );
}

export default Storyline;