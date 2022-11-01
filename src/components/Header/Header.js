import friendsIcon from "../../assets/icons/friends.svg";
import "../Header/Header.scss";
import { Link } from "react-router-dom";

const Header = ({ profileData, isLoggedIn }) => {
  // const name = profileData.displayName;
  return (
    <>
      <div className="header">
        <div className="header__friends">
          <img className="header__friends-icon" src={friendsIcon} />
        </div>
        <h1 className="header__title">putmeon</h1>
        <div className="header__profile">
          {isLoggedIn === true ? (
            <h5 className="header__profile-name">Lydia</h5>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="header__nav">
        <Link to="/feed">feed</Link>
        <Link to="/post-select">post</Link>
      </div>
    </>
  );
};

export default Header;
