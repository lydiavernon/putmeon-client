import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navigation/Navigation.scss";
import { useState, useEffect } from "react";

const Navigation = ({ isLoggedIn }) => {
  const [currentLocation, SetCurrentLocation] = useState([]);

  const location = useLocation();

  const whichPage = () => {
    if (location.pathname.includes("post")) {
      SetCurrentLocation("post");
    } else {
      SetCurrentLocation("feed");
    }
  };

  useEffect(() => {
    whichPage();
  }, [location]);

  return (
    <div className="nav">
      {isLoggedIn && (
        <Link
          className={`nav__feed ${
            currentLocation === "feed" ? "nav__feed--active" : ""
          }`}
          to="/"
        >
          feed
        </Link>
      )}
      {isLoggedIn && (
        <Link
          className={`nav__post ${
            currentLocation === "post" ? "nav__post--active" : ""
          }`}
          to="/post-select"
        >
          post
        </Link>
      )}
    </div>
  );
};

export default Navigation;
