"use client";

import { getUsersPosts } from "@/actions";
import PostCard from "@/components/shared/post-card";
import UserAvatar from "@/components/shared/user-avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { useQuery } from "@tanstack/react-query";
import { FileIcon } from "lucide-react";
import { type User } from "next-auth";
import React from "react";

interface UserPostsProps {
  user: User | null | undefined;
  id: string;
}

const UsersPost = ({ user, id }: UserPostsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["GetUserPosts", id],
    queryFn: () => getUsersPosts(id),
  });

  if (isLoading) {
    return (
      <>
        <div className="flex items-center gap-4">
          <Skeleton className="size-14 md:size-20 rounded-full" />
          <Skeleton className="h-8 w-40" />
        </div>
        <Separator className="my-4" />
        <div className="mt-4 space-y-4">
          {/* Content section */}
          <div className="my-8">
            <Skeleton className="h-4 w-full mb-4 rounded-md" />{" "}
            {/* Placeholder for content line */}
            <Skeleton className="h-4 w-full mb-4 rounded-md" />{" "}
            {/* Placeholder for content line */}
            <Skeleton className="h-4 w-full rounded-md" />{" "}
            {/* Placeholder for content line */}
          </div>
          {/* LikeButton section */}
          <Skeleton className="h-8 w-24 rounded-md" />{" "}
          {/* Placeholder for LikeButton */}
        </div>
        <Separator className="my-4" />
        <div className="mt-4 space-y-4">
          {/* Content section */}
          <div className="my-8">
            <Skeleton className="h-4 w-full mb-4 rounded-md" />{" "}
            {/* Placeholder for content line */}
            <Skeleton className="h-4 w-full mb-4 rounded-md" />{" "}
            {/* Placeholder for content line */}
            <Skeleton className="h-4 w-full rounded-md" />{" "}
            {/* Placeholder for content line */}
          </div>
          {/* LikeButton section */}
          <Skeleton className="h-8 w-24 rounded-md" />{" "}
          {/* Placeholder for LikeButton */}
        </div>
      </>
    );
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { name, image, bio, Post } = data;

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="relative size-14 md:size-20">
          <UserAvatar
            fill
            src={image}
            alt={name}
            userId={id}
            className="relative"
          />
        </div>
        <div className="text-xl font-semibold lg:text-3xl">{name}</div>
      </div>
      {bio && <p className="mt-4 text-muted-foreground">{bio}</p>}
      <Separator className="my-4" />
      {Post.length > 0 ? (
        <div className="mt-4">
          {Post.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              showAuthor={false}
              user={user}
              queryKey={"posts"}
            />
          ))}
        </div>
      ) : (
        <div className="my-24 flex flex-col items-center justify-center gap-3">
          <div className="bg-muted flex size-24 items-center justify-center rounded-full">
            <FileIcon size={56} />
          </div>
          <div className="text-2xl font-semibold">No posts yet</div>
        </div>
      )}
    </>
  );
};

export default UsersPost;
