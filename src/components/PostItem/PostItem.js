import axios from "axios";
import { useEffect, useState } from "react";
import "../PostItem/PostItem.scss";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";
import profileIcon from "../../assets/icons/defaultProfile.svg";
import moment from "moment";

const PostItem = ({ post, setSongSaved }) => {
  const [song, SetSong] = useState(null);
  const [showSuccess, SetShowSuccess] = useState(false);

  const songId = post.posts.song_id;

  useEffect(() => {
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

    getSongbyId();
  }, [songId]);

  const handleSave = async (songURI) => {
    console.log(songURI);
    const result = await axios.get("http://localhost:8888/token");
    const token = result.data.token;
    await axios.post(
      "https://api.spotify.com/v1/playlists/6vWg4ZlaDyy3ee58OmITvX/tracks",
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

    // Change some state, which will re-trigger a backend call to get the library
    setSongSaved(true);
  };

  if (!song) {
    return <h1>loading...</h1>;
  }

  return (
    <article className="post">
      <section className="user">
        <div className="user__wrapper">
          <img
            className="user__img"
            src={post.users.avatar_url || profileIcon}
          ></img>
          <p className="user__name">{post.users.name}</p>
        </div>
        <p className="user__timestamp">
          {moment(post.posts.created_at, "YYYY-MM-DDTHH:mm:ss.SSSSZ").fromNow()}
        </p>
      </section>
      <p className="user__comment">{post.posts.comment}</p>
      <section className="song__info">
        {/* <img className="song__img" src={song.album.images[0].url} />
        <div className="song__text">
          <p className="song__name">{song.name}</p>
          <p className="song__artist">By {song.artists[0].name}</p>
        </div> */}
      </section>
      <SpotifyPlayer song={song} />

      <section className="actions">
        <div className="actions__button">
          {!showSuccess && (
            <button
              onClick={() => {
                handleSave(song.uri);
              }}
              className="actions__text"
            >
              SAVE
            </button>
          )}
          {showSuccess && (
            <p className="actions__text actions__text--disabled">
              {" "}
              track added to your playlist!
            </p>
          )}
        </div>
      </section>
    </article>
  );
};

export default PostItem;
