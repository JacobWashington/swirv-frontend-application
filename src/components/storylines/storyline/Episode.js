import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";


const Episode = (state) => {
    const epId = state.location.state;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchTitle = async () => {
          const response = await axios.get(`http://localhost:8000/swirv/episodes/${epId}`);
          const theTitle = response.data.title;
          setTitle(theTitle)
        }
        const fetchContent = async () => {
          const response = await axios.get(`http://localhost:8000/swirv/episodes/${epId}`);
          const theContent= response.data.content;
          setContent(theContent)
        }
        fetchTitle();
        fetchContent();
    }, [epId])

    const handleDelete = async ()=> {
      const payload = {episodeId : epId}
      await axios.post(`http://localhost:8000/swirv/episodes/del/${epId}`, payload)
      alert("Episode was deleted!")
      history.goBack()
      history.goBack()
  }
    
    console.log("Episode.js - STATE >>>>>", state)
    let history = useHistory();
    // const offerDeleteOrBranch = (props.location.state.authId === currentUser.id)
    return (
        <div>
            <br />
            <h2>Title: {title}</h2>
            <br />
            <p>{content}</p>
            <br />
            <button className="btn" onClick={() => handleDelete()}>Delete Episode</button>
            {/* {offerDeleteOrBranch ? <button className="btn" onClick={() => handleDelete()}>Delete Episode</button> : <p></p>} */}
            <br />
            <button className="btn" onClick={() => history.goBack()}>Return</button>
        </div>
    );
}

export default Episode;