import React from "react";
import { Link } from "react-router-dom";
import "../SongItem/SongItem.scss";

const SongItem = ({ song }) => {
  console.log(song);
  return (
    <Link to={`/post-write/${song.track.id}`}>
      {" "}
      <article className="songItem">
        <div className="songItem__text">
          <p className="songItem__name">{song.track.name}</p>
          <p className="songItem__artist">{song.track.artists[0].name}</p>
        </div>
        <div className="songItem__img-wrapper">
          <img className="songItem__img" src={song.track.album.images[0].url} />
        </div>
      </article>
    </Link>
  );
};

export default SongItem;
