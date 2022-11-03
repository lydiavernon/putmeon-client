import "../FeedPage/Feed.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import PostItem from "../../components/PostItem/PostItem";

const Feed = () => {
  const [posts, SetPosts] = useState([]);

  const getPosts = async () => {
    const { data } = await axios.get("http://localhost:8888/post");
    SetPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <p>Welcome to your feed</p>
      <ul>
        {posts.map((post) => {
          return <PostItem key={post.posts.id} post={post} />;
        })}
      </ul>
    </div>
  );
};

export default Feed;
