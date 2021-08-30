import React from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import ScrollComponent from "./ScrollComponent";
import Question from "./Question";

function Main() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trivia Questions</h1>
      </header>
      <HashRouter>
        <div className="content">
                  <Route exact path="/" component={ScrollComponent} />
                  <Route path="/question" component={Question} />
        </div>
      </HashRouter>
    </div>
  );
}

export default Main;
