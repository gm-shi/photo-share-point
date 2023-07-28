"use client";
import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import { PostFeed } from "@/components/posts/PostFeed";

const Home = () => {
  return (
    <div>
      <Header label={"Home"} />
      <Form placeholder="Something to share" />
      <PostFeed />
    </div>
  );
};
export default Home;
