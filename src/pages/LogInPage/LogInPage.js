import Feed from "../FeedPage/Feed";
import LogIn from "../../components/LogIn/LogIn";

const LogInPage = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <Feed />;
  }
  return <LogIn />;
};

export default LogInPage;
