import React from "react";
import "../LogOut/LogOut.scss";

const LogOut = () => {
  return (
    <div>
      <div className="logout">
        <a className="logout__text" href="http://localhost:8888/auth/logout">
          Log Out
        </a>
      </div>
    </div>
  );
};

export default LogOut;
