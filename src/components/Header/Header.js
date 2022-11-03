import friendsIcon from "../../assets/icons/friends.svg";
import "../Header/Header.scss";
import { Link } from "react-router-dom";

const Header = ({ profileData, isLoggedIn }) => {
  // const name = profileData.displayName || "test";
  console.log(profileData);

  return (
    <>
      <div className="header">
        <div className="header__friends">
          {isLoggedIn && (
            <img className="header__friends-icon" src={friendsIcon} />
          )}
        </div>
        <h1 className="header__title">putmeon</h1>
        <div className="header__profile">
          {isLoggedIn && (
            <h5 className="header__profile-name">{profileData.displayName}</h5>
          )}
          {isLoggedIn && (
            <div className="header__profile-img-wrap">
              <img
                className="header__profile-img"
                src={profileData.photos[0].value}
              />
            </div>
          )}
        </div>
      </div>
      <div className="header__nav">
        {isLoggedIn && (
          <Link className="header__feed" to="/">
            feed
          </Link>
        )}
        {isLoggedIn && (
          <Link className="header__post" to="/post-select">
            post
          </Link>
        )}
      </div>
    </>
  );
};

export default Header;
