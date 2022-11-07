import React from "react";
import { Link } from "react-router-dom";
import "../SongItem/SongItem.scss";

const SongItem = ({ song }) => {
  return (
    <Link to={`/post-write/${song.id}`}>
      <article className="songItem">
        <div className="songItem__text">
          <p className="songItem__name">{song.name}</p>
          <p className="songItem__artist">{song.artists[0].name}</p>
        </div>
        <div className="songItem__img-wrapper">
          <img className="songItem__img" src={song.album.images[0].url} />
        </div>
      </article>
    </Link>
  );
};

export default SongItem;
