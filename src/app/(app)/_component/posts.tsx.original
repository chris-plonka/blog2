"use client";

import { getPosts } from "@/actions";
import { useQuery } from "@tanstack/react-query";

import { type User } from "next-auth";
import React from "react";
import PostPlaceholder from "@/components/post-placeholder";
import PostCard from "@/components/shared/post-card";

interface PostsProps {
  user: User | null | undefined;
}

const Posts = ({ user }: PostsProps) => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });


if (!data || data.length === 0) {
    return <div>No posts found.</div>;
  }
 /*  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((post, i) => (
          <PostPlaceholder key={i} />
        ))}
      </>
    );
  } */

  

  return (
    <div>
      {data &&
        data.map((post) => (
          <PostCard key={post.id} post={post} user={user} queryKey={"posts"} />
        ))}
    </div>
  );
};

export default Posts;
