import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Write from "./components/Write";

import NotFound from "./components/Notfound";
import PostState from "./context/post/postState";
const App = () => {
  return (
    <PostState>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/w" component={Write} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </PostState>
  );
};

export default App;
