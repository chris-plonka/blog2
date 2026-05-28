"use client";

import { Loader2Icon, PenSquareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "./ui/button";
import { createNewPost } from "@/actions";
import { toast } from "./ui/use-toast";

const NewPostButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const newPost = () => {
    startTransition(async () => {
      try {
        const postId = await createNewPost("Untitled post");
        router.refresh();
        router.push(`/editor/${postId}`);
      } catch (error) {
        toast({
          title: "Failed to create post",
          description: "An error occurred while creating a new post",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Button
      variant="ghost"
      className="py-1.5"
      onClick={newPost}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2Icon size={16} className="mr-2 animate-spin" />
      ) : (
        <PenSquareIcon size={16} className="mr-2" />
      )}
      Write
    </Button>
  );
};

export default NewPostButton;
