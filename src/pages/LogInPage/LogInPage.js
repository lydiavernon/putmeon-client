import Feed from "../FeedPage/Feed";
import LogIn from "../../components/LogIn/LogIn";

const LogInPage = ({ isLoggedIn, setSongSaved }) => {
  if (isLoggedIn) {
    return <Feed setSongSaved={setSongSaved} />;
  }
  return <LogIn />;
};

export default LogInPage;
