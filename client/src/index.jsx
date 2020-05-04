import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

console.log("STRIPE KEY IS", process.env.REACT_APP_STRIPE_KEY);
console.log("Environment is", process.env.NODE_ENV);

/**
 * From every action creator an action should be returned immediatedly if not then we have to use middleware
 */

/**
 *  REDUX FLOW SYNC
 *
 * React Components-> (calls a) -> Action Creator -> (produces/returns an)-> Action -> (sent to)->
 * Reducers -> (updates state in) -> Store -> (state sent back to components causing them to rerender) -> React Components
 */

/**
 * REDUX FLOW ASYNC
 * React Components-> (calls a) -> Action Creator -> (produces an)-> Action -> (sent to)->
 * Dispatch Function -> Store -> Reducers -> (updates state in) -> Store -> (state sent back to components causing them to rerender) -> React Components
 */
