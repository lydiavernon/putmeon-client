import axios from "axios";
import { useState, useEffect } from "react";
import "../MyTracks/MyTracks.scss";

const MyTracks = ({ songSaved, setSongSaved }) => {
  const [tracks, SetTracks] = useState([]);

  useEffect(() => {
    const getPlaylist = async () => {
      const result = await axios.get("http://localhost:8888/token");
      const token = result.data.token;
      const { data } = await axios.get(
        "https://api.spotify.com/v1/playlists/6vWg4ZlaDyy3ee58OmITvX/tracks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      SetTracks(data.items);
    };

    getPlaylist();

    setSongSaved(false);
  }, [songSaved]);

  return (
    <div>
      <h3 className="track__title">My Saved Tracks</h3>
      <ul>
        {tracks.length === 0 && <p>Start saving songs to fill playlist</p>}
        {tracks.map((track) => {
          return (
            <li key={track.track.id} className="track__item">
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
