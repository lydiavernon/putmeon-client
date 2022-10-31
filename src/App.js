import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    axios
      // USE Create react app's .env to put the backend url in a env variable
      .get(`http://localhost:8888/auth/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoggedIn(true);
        setProfileData(res.data);

        // TODO: Refactor to async/await

        // Create a user
        axios
          .post(
            `http://localhost:8888/auth/profile/create`,
            {
              spotify_user_id: res.data.id,
              avatar_url: res.data.photos[0].value,
              name: res.data.displayName,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {})
          .catch((err) => {});
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setIsLoggedIn(false);
        } else {
          console.log("Error authenticating", err);
        }
      });
  }, []);

  return (
    <div className="App">
      <a href="http://localhost:8888/auth/spotify">Login via Spotify</a>
    </div>
  );
}

export default App;
