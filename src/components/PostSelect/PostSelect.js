import axios from "axios";
import { useEffect, useState } from "react";
import "../PostSelect/PostSelect.scss";
import SongItem from "../SongItem/SongItem";

const PostSelect = ({ accessToken }) => {
  const [recentlyPlayed, SetRecentlyPlayed] = useState(null);
  const [songsAreShown, setSongsAreShown] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getRecentlyPlayed = async () => {
      if (!accessToken) {
        return;
      }

      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      SetRecentlyPlayed(data.items);
    };

    getRecentlyPlayed();
  }, [accessToken]);

  const getSearchResults = async (e) => {
    setSearchQuery(e.target.value);

    if (!e.target.value) {
      return;
    }

    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${e.target.value}&type=track`, // &include_external=audio
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setSearchResults(data);
  };

  if (!recentlyPlayed) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <input
        className="post__search"
        placeholder="search spotify library by song name"
        onFocus={() => setSongsAreShown(false)}
        onChange={(e) => getSearchResults(e)}
        onBlur={(e) => {
          if (!e.target.value) setSongsAreShown(true);
        }}
      />

      {songsAreShown && (
        <>
          <h2>Your recently played songs</h2>
          <ul>
            {recentlyPlayed.map((song, i) => {
              return <SongItem key={i} song={song.track} />;
            })}
          </ul>
        </>
      )}

      {!songsAreShown && searchQuery && searchResults.tracks && (
        <>
          <ul>
            {searchResults.tracks.items.map((song, i) => {
              return <SongItem key={i} song={song} isSearchResult={true} />;
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default PostSelect;
