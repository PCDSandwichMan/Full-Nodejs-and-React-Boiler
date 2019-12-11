import React from "react";
import "./styles/rootStyles/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <h1>Hello people</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
