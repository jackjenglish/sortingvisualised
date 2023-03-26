import "./polyfill";
import "./index.css";
import "./css/Algorithms.css";
import "./css/App.css";
import "./css/Sorting.css";
import "./css/SpeedSlider.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Route path="/" component={App} />
  </Router>,

  document.getElementById("root")
);

registerServiceWorker();
