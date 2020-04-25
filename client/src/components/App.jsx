import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header.jsx";
import Homepage from "./Homepage";
import { fetchUser } from "../actions";

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
  </div>
);
const SurveyNew = () => <h2>SurveyNew</h2>;

const App = (props) => {
  useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default connect(null, { fetchUser })(App);
