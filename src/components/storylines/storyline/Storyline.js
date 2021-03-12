import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';



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

    return (
        <div>
            <h2>Storyline: {storylineTitle}</h2>
            <h3>Episodes:</h3>
            {episodes}
            <Link to='/storylines'>RETURN</Link>

        </div>
    );
}

export default Storyline;