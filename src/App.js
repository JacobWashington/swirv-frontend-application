import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./containers/layout/Layout";
import Particles from "react-particles-js";

const App = () => {
  return (
    <Router>
      <div>
        <Layout />
        <div >
          <Particles params={{
              "particles": {
                  "number": {
                      "value": 75
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
          }}/>
        </div>
      </div>
    </Router>
  );
};
export default App;
