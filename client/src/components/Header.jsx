import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Payments from "./Payments";

const Header = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  const renderContent = () => {
    switch (props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1" className="item">
            <a href="/auth/google">
              <button className="ui google plus button">
                <i aria-hidden="true" className="google icon" />
                Login with Google
              </button>
            </a>
          </li>,
          <li key="2" className="item">
            <a href="/auth/facebook">
              <button className="ui facebook button">
                <i aria-hidden="true" className="facebook icon" />
                Login with Facebook
              </button>
            </a>
          </li>,
        ];
      default:
        return [
          <li key="3" className="item">
            <Payments />
          </li>,
          <li key="5" className="item">
            <span>Credits: {props.auth.credits}</span>
          </li>,
          <li key="4" className="item">
            <a href="/api/logout">
              <button className="ui button">
                <i className="log out icon"></i>
                Logout
              </button>
            </a>
          </li>,
        ];
    }
  };

  return (
    <div className="ui menu large">
      <Link to={props.auth ? "/surveys" : "/"} className="header item">
        Emaily
      </Link>
      <div className="right menu">{renderContent()}</div>
    </div>
  );
};

const mapStatetoProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStatetoProps)(Header);
