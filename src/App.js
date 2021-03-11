import "./App.css";
import {BrowserRouter as Router} from "react-router-dom";
import Layout from "./containers/layout/Layout";

const App = () => {
  return (
    <Router>
      <div>
        <Layout />
      </div>
    </Router>
  );
};

export default App;
