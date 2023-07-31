"use client";

import { Form } from "@/components/Form";
import { Header } from "@/components/Header";
import { PostItem } from "@/components/posts/PostItem";
import { usePost } from "@/hooks/usePost";
import { ClipLoader } from "react-spinners";
import { CommentFeed } from "@/components/posts/CommentFeed";

const PostView = ({ params }: { params: { postId: string } }) => {
  const { data: fetchedPost, isLoading } = usePost(params.postId);

  return isLoading ? (
    <div className="flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ) : (
    <>
      <Header label="Post" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form postId={params.postId} isComment placeholder="Post your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
