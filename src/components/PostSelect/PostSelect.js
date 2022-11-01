import axios from "axios";
import { useEffect, useState } from "react";
import "../PostSelect/PostSelect.scss";
import SongItem from "../SongItem/SongItem";

const PostSelect = () => {
  const [recentlyPlayed, SetRecentlyPlayed] = useState(null);

  const getRecentlyPlayed = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          Authorization:
            "Bearer BQD7vEcWHCe5AOjCI-Ys-W6elkZoMaJdVJ574cw38XagFZVA2w6xdSffhirRUXC7M9DqHMTDG7HSJviy6PMvAzWGXCQzeyKuTLjwFiVJ_T1zxjhvmudYePYhFBwzMhymHhE4U5UtEgWMB3H6LpNH5TwN1kpJScyMM0iDGsOLeFb45m4sOXchYMGpKTkXiuL-oquO",
        },
      }
    );
    // console.log(data);
    SetRecentlyPlayed(data.items);
  };

  useEffect(() => {
    getRecentlyPlayed();
  }, []);

  //   console.log(recentlyPlayed);

  if (!recentlyPlayed) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <input placeholder="search library" />
      <h2>Your recently played songs</h2>
      <ul>
        {recentlyPlayed.map((song) => {
          return <SongItem song={song} />;
        })}
      </ul>
    </>
  );
};

export default PostSelect;
