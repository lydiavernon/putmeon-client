import React from "react";

const SongItem = ({ song }) => {
  console.log(song);
  return (
    <div>
      <p>{song.track.name}</p>
    </div>
  );
};

export default SongItem;
