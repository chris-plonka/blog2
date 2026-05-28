import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/get-current-user";
import UserPosts from "./_components/user-posts";


export const metadata: Metadata = {
  title: "Your posts",
};

const PostsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/me/posts");
  }

  return (
    <>
      <UserPosts user={user} />
    </>
  );
};

export default PostsPage;
