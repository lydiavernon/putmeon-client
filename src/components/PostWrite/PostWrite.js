import "../PostWrite/PostWrite.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostWrite = ({ profileData }) => {
  const [song, SetSong] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const songId = form.song_id.value;
    const comment = form.comment.value;
    const userSpotifyId = profileData.id;

    await axios.post("http://localhost:8888/post", {
      song_id: songId,
      comment: comment,
      user_spotify_id: userSpotifyId,
    });

    navigate("/");
  };

  if (!song) {
    return <h1>Loading...</h1>;
  }
  console.log(song);

  return (
    <div className="post">
      <section className="song__info">
        <p>you have selected:</p>
        <p>{song.name}</p>
        <p>By {song.artists[0].name}</p>
        <img className="song__img" src={song.album.images[0].url} />
      </section>
      <form onSubmit={(e) => submitHandler(e)}>
        <textarea
          name="comment"
          rows="15"
          placeholder="add a comment..."
        ></textarea>
        <input type="hidden" name="song_id" value={song.id} />
        <button type="submit">POST</button>
      </form>
    </div>
  );
};

export default PostWrite;
