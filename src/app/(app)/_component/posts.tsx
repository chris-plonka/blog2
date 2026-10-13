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
      <>
        {Array.from({ length: 10 }).map((_, i) => (
          <PostPlaceholder key={i} />
        ))}
      </>
    );
  }

  if (!data || data.length === 0) {
    return <div>No posts found.</div>;
  }

  return (
    // Zmieniono lg:grid-cols-3 na lg:grid-cols-2 (układ: 1 kolumna na telefonie, 2 na komputerze i tablecie)
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4 max-w-5xl mx-auto">
      {data &&
        data.map((post) => (
          <PostCard key={post.id} post={post} user={user} queryKey={"posts"} />
        ))}
    </div>
  );
};

export default Posts;
