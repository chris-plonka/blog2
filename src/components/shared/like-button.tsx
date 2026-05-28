"use client";

import { createId } from "@paralleldrive/cuid2";
import { type Like } from "@prisma/client";

import { Heart } from "lucide-react";
import { type User } from "next-auth";
import * as React from "react";

import { likePost, unlikePost } from "@/actions";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { toast } from "../ui/use-toast";

interface LikeButtonProps {
  likes: Like[];
  user: User | undefined;
  postId: string;
}

const LikeButton = (props: LikeButtonProps) => {
  const { likes, user, postId } = props;
  const [optimisticLikes, setOptimisticLikes] = React.useState<Like[]>(likes);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setOptimisticLikes(likes);
  }, [likes]);

  const isUserLiked = optimisticLikes.some((like) => like.userId === user?.id);

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (!isUserLiked) {
        setOptimisticLikes((prev) => [
          ...prev,
          {
            id: createId(),
            userId: user ? user.id : createId(),
            postId,
          },
        ]);
        await likePost(postId);
      } else {
        setOptimisticLikes((prev) =>
          prev.filter(
            (like) => like.userId !== user?.id || like.postId !== postId
          )
        );
        await unlikePost(postId);
      }
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticLikes(likes);
      toast({
        title: "Error",
        description: "An error occurred while liking the post.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={cn("flex items-center gap-2", !user && "cursor-not-allowed")}
      disabled={!user || isLoading}
      onClick={handleLike}
      variant={"custom"}
    >
      <Heart
        size={20}
        className={cn(isUserLiked && "fill-red-500 text-red-500")}
      />
      {optimisticLikes.length}
    </Button>
  );
};

export default LikeButton;
