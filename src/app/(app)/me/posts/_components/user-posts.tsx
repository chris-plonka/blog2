"use client";

import { getUserPosts } from "@/actions";
import PageHeader from "@/components/page-header";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import React from "react";
import Loading from "./loading";

import Content from "./content";
import { User } from "next-auth";

interface UserPostsProps {
  user: User;
}

const UserPosts = ({ user }: UserPostsProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-posts", user.id],
    queryFn: () => {
      return getUserPosts(user.id);
    },
  });

  const posts = data!!;

  isError && redirect("/login?redirect=/me/posts");

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <PageHeader title="Your posts" className="mb-8" />
      <Content posts={posts} user={user} />
    </>
  );
};

export default UserPosts;
