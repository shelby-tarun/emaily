import React from "react";
import { Link } from "react-router-dom";

import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div>
      <Link to="/surveys/new">
        <button
          className="dashboard__add-survey-btn"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <i className="fa fa-plus fa-lg" style={{ color: "white" }} />
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
