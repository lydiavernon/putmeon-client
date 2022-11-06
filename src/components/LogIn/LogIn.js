import React from "react";
import "../LogIn/LogIn.scss";
import spotifyIcon from "../../assets/icons/spotify.svg";

const LogIn = () => {
  return (
    <div className="login">
      <h1 className="login__title">welcome to putmeon</h1>
      <div>
        <a className="login__button" href="http://localhost:8888/auth/spotify">
          <p>Login with Spotify</p>
          <img className="login__icon" src={spotifyIcon} />
        </a>
      </div>
    </div>
  );
};

export default LogIn;
