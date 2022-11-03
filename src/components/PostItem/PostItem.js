import axios from "axios";
import { useEffect, useState } from "react";

const PostItem = ({ post }) => {
  const [song, SetSong] = useState(null);
  const songId = post.posts.song_id;

  const getSongbyId = async () => {
    const result = await axios.get("http://localhost:8888/token");
    const token = result.data.token;
    const { data } = await axios.get(
      `https://api.spotify.com/v1/tracks/${songId}`,
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
    return <h1>loading...</h1>;
  }

  return (
    <article>
      <section className="user">
        <p className="user-name">{post.users.name}</p>
      </section>
      <section className="song__info">
        <p>{song.name}</p>
        <p>By {song.artists[0].name}</p>
        <img className="song__img" src={song.album.images[0].url} />
      </section>
      <p>{post.posts.comment}</p>
    </article>
  );
};

export default PostItem;
