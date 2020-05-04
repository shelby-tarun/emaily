import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "../actions";
import Dashboard from "./Dashbaord/Dashboard";
import Header from "./Header";
import Homepage from "./Homepage";
import SurveyNew from "./Surveys/SurveyNew";

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
