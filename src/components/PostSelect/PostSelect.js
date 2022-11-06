import axios from "axios";
import { useEffect, useState } from "react";
import "../PostSelect/PostSelect.scss";
import SongItem from "../SongItem/SongItem";

const PostSelect = ({ handleSongSelect }) => {
  const [recentlyPlayed, SetRecentlyPlayed] = useState(null);

  const getRecentlyPlayed = async () => {
    const result = await axios.get("http://localhost:8888/token");
    const token = result.data.token;

    console.log(token);
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    SetRecentlyPlayed(data.items);
  };

  useEffect(() => {
    getRecentlyPlayed();
  }, []);

  if (!recentlyPlayed) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <input
        className="post__search"
        placeholder="search spotify library by song name"
      />
      <h2>Your recently played songs</h2>
      <ul>
        {recentlyPlayed.map((song) => {
          return <SongItem handleSongSelect={handleSongSelect} song={song} />;
        })}
      </ul>
    </>
  );
};

export default PostSelect;
