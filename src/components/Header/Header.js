import "../Header/Header.scss";
import { Link } from "react-router-dom";
import LogOut from "../LogOut/LogOut";
import profileIcon from "../../assets/icons/defaultProfile.svg";
import axios from "axios";
import MyTracks from "../MyTracks/MyTracks";
import Navigation from "../Navigation/Navigation";

const Header = ({ profileData, isLoggedIn, songSaved, setSongSaved }) => {
  if (!profileData) {
    return null;
  }

  let profileImgUrl = "";

  if (profileData.photos.length > 0) {
    profileImgUrl = profileData.photos[0].value;
  } else {
    profileImgUrl = profileIcon;
  }

  const createPlaylist = async () => {
    //checking if has playlist
    const results = await axios.get(
      `http://localhost:8888/users/${[profileData.id]}`
    );
    const hasPlaylist = results.data[0].is_verified;

    //if no playlist, make one on spotify
    if (!hasPlaylist) {
      const result = await axios.get("http://localhost:8888/token");
      const token = result.data.token;

      const data = {
        name: "putmeon tracks",
        description: "all my saved tracks from putmeon feed",
        public: false,
      };

      const createPlaylistResult = await axios.post(
        `https://api.spotify.com/v1/users/${profileData.id}/playlists`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const playlistId = createPlaylistResult.id;

      // A knex query to save the ID against the user

      //update DB to set hasPlaylist to true so we dont repeat
      await axios.put(`http://localhost:8888/users/${[profileData.id]}`);
    }
  };

  createPlaylist();

  return (
    <div className="header__wrapper">
      <div className="header">
        <div className="header__title-wrap">
          <img
            className="header__title-img"
            src="https://cdn-icons-png.flaticon.com/512/644/644417.png"
          />
          <h1 className="header__title">putmeon</h1>
        </div>
        <div className="header__profile">
          {isLoggedIn && (
            <h5 className="header__profile-name">{profileData.displayName}</h5>
          )}
          {isLoggedIn && (
            <div className="header__profile-img-wrap">
              <img className="header__profile-img" src={profileImgUrl} />
            </div>
          )}
        </div>
        {isLoggedIn && <LogOut />}
      </div>
      <Navigation isLoggedIn={isLoggedIn} />
      <section className="playlist">
        <MyTracks
          profileData={profileData}
          songSaved={songSaved}
          setSongSaved={setSongSaved}
        />
      </section>
    </div>
  );
};

export default Header;
