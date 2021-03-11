import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./containers/layout/Layout";
import Particles from "react-particles-js";

const App = () => {
  return (
    <Router>
      <div>
        <Layout />
        <div className="particles">
          <Particles />
        </div>
      </div>
    </Router>
  );
};
export default App;
