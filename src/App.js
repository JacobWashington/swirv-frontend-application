import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./containers/layout/Layout";
import Particles from "react-particles-js";

const App = (props) => {
  return (
    <Router>
      <div>
        <Layout />
        <Particles
          params={{
            "particles": {
                "number": {
                    "value": 115
                },
                "size": {
                    "value": 3
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    }
                }
            }
        }}
        />
      </div>
    </Router>
  );
};
export default App;
