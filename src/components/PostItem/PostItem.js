import axios from "axios";
import { useEffect, useState } from "react";
import "../PostItem/PostItem.scss";

const PostItem = ({ post }) => {
  const [song, SetSong] = useState(null);
  const [showSuccess, SetShowSuccess] = useState(false);

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

  const handleSave = async (songURI) => {
    console.log(songURI);
    const result = await axios.get("http://localhost:8888/token");
    const token = result.data.token;
    await axios.post(
      "https://api.spotify.com/v1/playlists/0vJGOHPeVJWXFXYVIca1c7/tracks",
      {
        uris: [songURI],
        position: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    SetShowSuccess(true);
    setTimeout(() => {
      SetShowSuccess(false);
    }, 2000);
  };

  if (!song) {
    return <h1>loading...</h1>;
  }

  return (
    <article className="post">
      <section className="user">
        <p className="user-name">{post.users.name}</p>
      </section>
      <p className="post__comment">{post.posts.comment}</p>
      <section className="song__info">
        <img className="song__img" src={song.album.images[0].url} />
        <div className="song__text">
          <p className="song__name">{song.name}</p>
          <p className="song__artist">By {song.artists[0].name}</p>
        </div>
      </section>
      <section className="actions">
        <div
          onClick={() => {
            handleSave(song.uri);
          }}
          className="actions__button"
        >
          {!showSuccess && <p className="actions__text">SAVE</p>}
          {showSuccess && <p>track added to your playlist!</p>}
        </div>
      </section>
    </article>
  );
};

export default PostItem;
