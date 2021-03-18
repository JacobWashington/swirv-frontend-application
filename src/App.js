import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./containers/layout/Layout";
import Particles from "react-particles-js";

const App = (props) => {
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  console.log(REACT_APP_SERVER_URL);
  return (
    <div>
      <Layout />
      <Particles
        params={{
          particles: {
            number: {
              value: 115,
            },
            size: {
              value: 3,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        }}
      />
    </div>
  );
};
export default App;
