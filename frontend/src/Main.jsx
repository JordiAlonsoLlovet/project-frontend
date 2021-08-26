import React from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import ScrollComponent from "./ScrollComponent";

function Main() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trivia Questions</h1>
      </header>
      <HashRouter>
        <div className="content">
          <Route path="/" component={ScrollComponent} />
        </div>
      </HashRouter>
    </div>
  );
}

export default Main;
