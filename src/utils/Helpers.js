import axios from "axios";

const createPlaylist = async (userId) => {
  const result = await axios.get("http://localhost:8888/token");
  const token = result.data.token;
  //find playlist by name 'putmeon tracks'
  //return id
  //if error, create playlist?
  const { data } = await axios.post(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      name: "putmeon tracks",
      description: "all my saved tracks from putmeon feed",
      public: false,
    }
  );
};
