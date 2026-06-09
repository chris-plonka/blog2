"use client";

import { Post, Visibility } from "@prisma/client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, SettingsIcon } from "lucide-react";

import { savePost, saveVisibility } from "@/actions";
import Back from "@/components/back";
import Editor from "./editor";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface FormProps {
  post: Post;
}

const Form = ({ post }: FormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // LOCAL STATE (edytowalne kopie)
  const [title, setTitle] = React.useState(post.title);
  const [description, setDescription] = React.useState(post.description || "");
  const [content, setContent] = React.useState(post.content || "");
  const [visibility, setVisibility] = React.useState<Visibility>(post.visibility);
  const [open, setOpen] = React.useState(false);

  // 🔥 JEDEN SYNCHRONIZUJĄCY EFFECT (najważniejsze)
  React.useEffect(() => {
    setTitle(post.title);
    setDescription(post.description || "");
    setContent(post.content || "");
    setVisibility(post.visibility);
  }, [post]);

  // ---------------- MUTATIONS ----------------

  const saveMutation = useMutation({
    mutationFn: (published: boolean) =>
      savePost(post.id, title, content, description, published),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getPostById", post.id],
      });

      toast({
        title: "Zapisano",
        description: "Post został zapisany",
      });
    },
  });

  const visibilityMutation = useMutation({
    mutationFn: () => saveVisibility(post.id, visibility),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getPostById", post.id],
      });

      setOpen(false);

      toast({
        title: "Zapisano ustawienia",
      });
    },
  });

  // ---------------- HANDLERS ----------------

  const handleSaveDraft = () => {
    if (!title) return;
    saveMutation.mutate(false);
  };

  const handlePublish = () => {
    if (!title) return;
    saveMutation.mutate(true);

    router.push(`/posts/${post.id}`);
  };

  const handleVisibilitySave = () => {
    visibilityMutation.mutate();
  };

  // ---------------- UI ----------------

  return (
    <>
      <div className="flex items-center justify-between">
        <Back />

        {post.published && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <SettingsIcon size={20} />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <Label>Visibility</Label>

              <Select
                value={visibility}
                onValueChange={(v) => setVisibility(v as Visibility)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Visibility.PUBLIC}>Public</SelectItem>
                  <SelectItem value={Visibility.PRIVATE}>Private</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleVisibilitySave}>
                Save
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="my-8 space-y-6">
        {/* TITLE */}
        <div>
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* CONTENT */}
        <Editor
          value={content}
          onChange={setContent}
        />

        {/* ACTIONS */}
        <div className={cn("flex justify-between")}>
          <Button onClick={handleSaveDraft} variant="custom">
            Save draft
          </Button>

          <Button onClick={handlePublish}>
            Publish
          </Button>
        </div>
      </div>
    </>
  );
};

export default Form;