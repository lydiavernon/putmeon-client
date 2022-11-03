import "../PostWrite/PostWrite.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const PostWrite = () => {
  const [song, SetSong] = useState(null);
  const { id } = useParams();

  const getSongbyId = async () => {
    const result = await axios.get("http://localhost:8888/token");
    const token = result.data.token;
    const { data } = await axios.get(
      `https://api.spotify.com/v1/tracks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    SetSong(data);
    console.log(data);
  };

  useEffect(() => {
    getSongbyId();
  }, []);

  if (!song) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="post">
      <section className="song__info">
        <p>You have selected: {song.track.name}</p>
        <p>By {song.track.artists[0].name}</p>
        <img className="song__img" src={song.track.album.images[0].url} />
      </section>
      <form>
        <input type="textarea" rows="100"></input>
      </form>
    </div>
  );
};

export default PostWrite;
