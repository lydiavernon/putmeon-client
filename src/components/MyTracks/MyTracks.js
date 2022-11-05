import axios from "axios";
import { useState, useEffect } from "react";
import "../MyTracks/MyTracks.scss";

const MyTracks = () => {
  const [tracks, SetTracks] = useState([]);

  const getPlaylist = async () => {
    const result = await axios.get("http://localhost:8888/token");
    const token = result.data.token;
    const { data } = await axios.get(
      "https://api.spotify.com/v1/playlists/0vJGOHPeVJWXFXYVIca1c7/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    SetTracks(data.items);
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <div>
      <h3 className="track__title">My Saved Tracks</h3>
      <ul>
        {tracks.map((track) => {
          return (
            <li className="track__item">
              <p className="track__name">{track.track.name}</p>
              <p className="track__artist">{track.track.artists[0].name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyTracks;
