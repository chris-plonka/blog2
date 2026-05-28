"use server";

import { type Visibility } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/get-current-user";
import { db } from "@/lib/db";

// ignore eslint
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (error: any) => {
  throw new Error("Something went wrong. Please try again." + error.message);
};

const NOT_LOGGED_IN_ERROR = "Not logged in";

export const createNewPost = async (title: string) => {
  const user = await getCurrentUser();

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);

  try {
    const post = await db.post.create({
      data: {
        title,
        authorId: user.id,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/me/posts");

    return post.id;
  } catch (error: any) {
    handleError(error);
  }
};

export const deletePost = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);

  try {
    // First, fetch the post to check if the user is the author
    const post = await db.post.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!post) throw new Error("Post not found");

    // Check if the user is the author or an admin
    if (user.id !== post.authorId && !user.isAdmin) {
      throw new Error("Unauthorized to delete this post");
    }

    // If the user is the author or an admin, proceed with deletion
    await db.post.delete({
      where: { id },
    });

    revalidatePath("/me/posts");

    return;
  } catch (error: any) {
    handleError(error);
  }
};

export const savePost = async (
  id: string,
  title: string,
  content: string | null,
  description: string | null,
  published: boolean
) => {
  const user = await getCurrentUser();

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);

  try {
    // First, fetch the post to check if it exists
    const post = await db.post.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!post) throw new Error("Post not found");

    // Check if the user is the author or an admin
    if (user.id !== post.authorId && !user.isAdmin) {
      throw new Error("Unauthorized to edit this post");
    }

    // If the user is the author or an admin, proceed with the update
    await db.post.update({
      where: { id },
      data: {
        title,
        content,
        description,
        published,
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/posts/${id}`);
  } catch (error: any) {
    handleError(error);
  }
};

export const saveVisibility = async (id: string, visibility: Visibility) => {
  const user = await getCurrentUser();

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);

  try {
    await db.post.update({
      where: {
        id,
        authorId: user.id,
      },
      data: {
        visibility,
      },
    });

    revalidatePath(`/posts/${id}`);
  } catch (error: any) {
    handleError(error);
  }
};

export const likePost = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Please log in to like this post.");

  try {
    await db.like.create({
      data: {
        postId: id,
        userId: user.id,
      },
    });

    revalidatePath(`/posts/${id}`);
  } catch (error: any) {
    handleError(error);
  }
};

export const unlikePost = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Please log in to unlike this post.");

  try {
    const like = await db.like.findFirst({
      where: {
        postId: id,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!like) throw new Error("You have not liked this post.");

    await db.like.delete({
      where: {
        id: like?.id,
      },
    });

    revalidatePath(`/posts/${id}`);
  } catch (error: any) {
    handleError(error);
  }
};

export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        createdAt: true,
        visibility: true,
        authorId: true,
        updatedAt: true,
        published: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
            postId: true,
          },
        },
      },
    });

    return post;
  } catch (error: any) {
    handleError(error);
  }
};

export const getUserPosts = async (id: string) => {
  try {
    const posts = await db.post.findMany({
      where: {
        authorId: id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        published: true,
        createdAt: true,
        likes: {
          select: {
            id: true,
          },
        },
        author: {
          select: {
            isAdmin: true,
            name: true,
            image: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error: any) {
    handleError(error);
  }
};

export const getPosts = async () => {
  try {
    const posts = await db.post.findMany({
      where: {
        published: true,
        visibility: "PUBLIC",
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        published: true,
        author: {
          select: {
            name: true,
            image: true,
            id: true,
            isAdmin: true,
          },
        },
        likes: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error: any) {
    handleError(error);
  }
};

export const getUsersPosts = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        image: true,
        bio: true,
        Post: {
          where: {
            published: true,
            visibility: "PUBLIC",
          },
          select: {
            id: true,
            title: true,
            description: true,
            published: true,
            createdAt: true,
            likes: {
              select: {
                id: true,
              },
            },
            author: {
              select: {
                name: true,
                image: true,
                id: true,
                isAdmin: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return user;
  } catch (error) {
    handleError(error);
  }
};
