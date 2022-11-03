import friendsIcon from "../../assets/icons/friends.svg";
import "../Header/Header.scss";
import { Link } from "react-router-dom";
import LogOut from "../LogOut/LogOut";

const Header = ({ profileData, isLoggedIn }) => {
  if (!profileData) {
    return null;
  }

  let profileImgUrl = "";

  if (profileData.photos.length > 0) {
    profileImgUrl = profileData.photos[0].value;
  } else {
    profileImgUrl = "https://xsgames.co/randomusers/assets/avatars/pixel/4.jpg";
  }

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
              <img className="header__profile-img" src={profileImgUrl} />
            </div>
          )}
          {isLoggedIn && <LogOut />}
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
