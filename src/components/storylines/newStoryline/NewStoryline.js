import React from 'react';
import axios from 'axios'

const NewStoryline = () => {
    const [storylineName, setStorylineName] = useState("");

    const handleStorylineName = (e) => {
        setStorylineName(e.target.value)
    }
    const handleSubmit = (e) => {

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="box">
                    <h1>Log In</h1>
                    <input
                    type="text"
                    name="storylineName"
                    placeholder="Storyline Name"            
                    className="form_input"
                    onChange={handleStorylineName}                    
                    />            
                    <button type="submit" id="btn">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default NewStoryline;
