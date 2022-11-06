import React, { useEffect } from "react";

const SpotifyPlayer = ({ song }) => {
  return (
    <div>
      <iframe
        src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator`}
        width="100%"
        height="80"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;
