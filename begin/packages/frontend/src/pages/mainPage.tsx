import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { PostsList } from "../components/postsList";
import { PostsViewSwitcher } from "../components/postsViewSwitcher";
import { api } from "../App";

import { Post } from "@dddforum/shared/src/api/posts";

export const MainPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const loadPosts = async () => {
    try {
      const response = await api.posts.getPosts("recent");
      console.log("Posts loaded:", response);
      setPosts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <Layout>
      <PostsViewSwitcher />
      <PostsList posts={posts} />
    </Layout>
  );
};
