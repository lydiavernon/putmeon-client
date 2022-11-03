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
  };

  useEffect(() => {
    getSongbyId();
  }, []);

  if (!song) {
    return <h1>Loading...</h1>;
  }

  console.log(song);

  return (
    <div className="post">
      <form>
        <section className="song__info">
          <p>you have selected:</p>
          <p>{song.name}</p>
          <p>By {song.artists[0].name}</p>
          <img className="song__img" src={song.album.images[0].url} />
        </section>
        <textarea rows="15" placeholder="add a comment..."></textarea>
        <button type="submit">POST</button>
      </form>
    </div>
  );
};

export default PostWrite;
