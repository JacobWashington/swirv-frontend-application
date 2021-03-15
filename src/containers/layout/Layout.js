import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

// Import Components
import Navbar from "../../components/navbar/Navbar";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";
import Profile from "../../components/profile/Profile";
import About from "../../components/about/About";
import NewEpisode from "../../components/episodes/newEpisode/NewEpisode";
import NewStoryline from "../../components/storylines/newStoryline/NewStoryline";
import Storyline from "../../components/storylines/storyline/Storyline";
import TGA from "../../components/TGA/TGA";
import FeaturedList from "../../components/featuredList/FeaturedList";

const Layout = (props) => {
  const PrivateRoute = ({ component: Component, ...rest }) => {
    let token = localStorage.getItem("jwtToken");
    console.log("===> Hitting a Private Route");
    return (
      <Route
        {...rest}
        render={(props) => {
          return token ? (
            <Component {...rest} {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
    );
  };

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

  const nowCurrentUser = (userData) => {
    console.log("===> nowCurrent is here.");
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (localStorage.getItem("jwtToken")) {
      // remove token for localStorage
      localStorage.removeItem("jwtToken");
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <Login
              {...props}
              nowCurrentUser={nowCurrentUser}
              setIsAuthenticated={setIsAuthenticated}
              user={currentUser}
            />
          )}
        />
        <Route path="/signup" component={Signup} />
        <Route path="/featuredlist" component={FeaturedList} />
        <Route path="/about" component={About} />
        <Route path="/newepisode" render={() => <NewEpisode currentUser={currentUser}/>} />
        <Route path="/newstoryline" render={() => <NewStoryline currentUser={currentUser}/>} />
        <Route path="/storyline" render={() => <Storyline currentUser={currentUser}/>} />
        <Route path="/thegreatattractor" render={() => <TGA currentUser={currentUser}/>} />
        {/* <Route
          path="/episode"
          component={(...props) => <SomeComponent user={currentUser} />}
        /> */}

        <PrivateRoute
          path="/profile"
          component={Profile}
          user={currentUser}
          handleLogout={handleLogout}
        />
      </Switch>
    </div>
  );
};

export default Layout;
