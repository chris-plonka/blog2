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
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  if (isLoading) {
    return (
      <div className="columns-1 md:columns-2 gap-6 p-4 max-w-5xl mx-auto space-y-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="break-inside-avoid mb-6">
            <PostPlaceholder />
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div>No posts found.</div>;
  }

  return (
    
    <div className="columns-1 md:columns-2 gap-6 p-4 max-w-5xl mx-auto space-y-6">
      {data &&
        data.map((post) => (
          <div key={post.id} className="break-inside-avoid mb-6">
            <PostCard post={post} user={user} queryKey={"posts"} />
          </div>
        ))}
    </div>
  );
};

export default Posts;
