"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "@/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import * as React from "react";

const Danger = () => {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });
      router.push("/");
      router.refresh();
    },
    onError: (error: Error) => {
      toast({
        title: "An error occurred",
        description: error.message,
      });
    },
  });

  const handleDeleteMyAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value !== "delete my account") {
      return toast({
        title: "Invalid confirmation",
        description: 'Please type "delete my account" to continue.',
        variant: "destructive",
      });
    }

    deleteAccountMutation.mutate();
  };

  return (
    <div className="rounded-lg shadow-md border dark:border-red-500/50 dark:bg-zinc-900/60">
      <div className="p-4">
        <h4 className="mb-6 text-2xl font-semibold">Delete my account</h4>
        <p className="mb-4 text-sm">
          This action will permanently remove all your posts, data, and personal
          information associated with your account. This action is irreversible
          and cannot be undone.
        </p>
      </div>
      <div className="border-t border-red-500/50 bg-red-900/30 px-4 py-2 rounded-l-sm rounded-r-sm ">
        <AlertDialog open={open}>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="ml-auto"
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent asChild>
            <form onSubmit={handleDeleteMyAccount}>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our database.
                  <div className="my-8 flex flex-col gap-2">
                    <Label htmlFor="confirm">
                      Type{" "}
                      <span className="text-secondary-foreground font-bold">
                        delete my account
                      </span>{" "}
                      to continue:
                    </Label>
                    <Input
                      type="text"
                      id="confirm"
                      onChange={(e) => setValue(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </AlertDialogDescription>
              <div className="flex justify-between">
                <AlertDialogCancel
                  onClick={() => {
                    setOpen(false);
                    setValue("");
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className={buttonVariants({
                    variant: "destructive",
                  })}
                  type="submit"
                  disabled={
                    value !== "delete my account" ||
                    deleteAccountMutation.isPending
                  }
                >
                  {deleteAccountMutation.isPending ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </div>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Danger;
