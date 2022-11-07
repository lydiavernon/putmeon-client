import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LogInPage from "./pages/LogInPage/LogInPage";
import PostSelect from "./components/PostSelect/PostSelect";
import PostWrite from "./components/PostWrite/PostWrite";
import "./styles/partials/_resets.scss";
import "./styles/partials/_breakpoints.scss";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [songSaved, setSongSaved] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const result = await axios.get("http://localhost:8888/token");
      setAccessToken(result.data.token);
    };

    getToken();
  });

  useEffect(() => {
    axios
      // USE Create react app's .env to put the backend url in a env variable
      .get(`http://localhost:8888/auth/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoggedIn(true);

        setProfileData(res.data);

        // All users (inc those without picture)
        const userData = {
          spotify_user_id: res.data.id,
          name: res.data.displayName,
        };

        // If the user has a picture, also add that
        if (res.data.photos.length > 0) {
          userData["avatar_url"] = res.data.photos[0].value;
        } else {
          userData["avatar_url"] = "";
        }

        // TODO: Refactor to async/await

        // Create a user
        axios.post(`http://localhost:8888/auth/profile/create`, userData, {
          withCredentials: true,
        });
        // .then((res) => {})
        // .catch((err) => {});
      })
      .catch((err) => {
        if (err.status === 401) {
          setIsLoggedIn(false);
        } else {
          console.log("Error authenticating", err);
        }
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <section className="app">
          <Header
            profileData={profileData}
            isLoggedIn={isLoggedIn}
            songSaved={songSaved}
            setSongSaved={setSongSaved}
          />
          <main className="main">
            <Routes>
              <Route
                path="/"
                element={
                  <LogInPage
                    isLoggedIn={isLoggedIn}
                    setSongSaved={setSongSaved}
                  />
                }
              ></Route>
              <Route
                path="/post-select"
                element={<PostSelect accessToken={accessToken} />}
              ></Route>
              <Route
                path="/post-write/:id"
                element={<PostWrite profileData={profileData} />}
              ></Route>
            </Routes>
          </main>
        </section>
      </BrowserRouter>
    </>
  );
}

export default App;
