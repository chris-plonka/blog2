"use client";

import {
  MoreVerticalIcon,
  PencilIcon,
  Share2Icon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { type User } from "next-auth";
import * as React from "react";
import { SITE_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { copyUrl } from "@/utilis/copy-url";
import { toast } from "@/components/ui/use-toast";
import { deletePost } from "@/actions";

interface ControlsProps {
  id: string;
  user: User | null | undefined;
  authorId: string;
  postTitle: string;
  querykey: string;
}

const Controls = (props: ControlsProps) => {
  const { id, user, authorId, postTitle, querykey } = props;
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${querykey}`],
        refetchType: "active",
      });
      toast({
        title: "Post Deleted",
        description: "The post has been deleted successfully",
      });
      setOpen(false);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the post",
      });
      console.error(error);
    },
  });

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="px-2">
            <MoreVerticalIcon size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => copyUrl(`${SITE_URL}/posts/${id}`)}>
            <Share2Icon size={16} className="mr-2.5" />
            Share
          </DropdownMenuItem>
          {user && (user.isAdmin || user.id === authorId) && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/editor/${id}`}>
                  <PencilIcon size={16} className="mr-2.5" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash2Icon size={16} className="mr-2.5" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-28">
              &quot;{postTitle}&quot;
            </span>
            will be permanently deleted. This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex justify-between">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className={buttonVariants({
                variant: "destructive",
              })}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Controls;
