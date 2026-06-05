"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2Icon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type User } from "next-auth";
import * as React from "react";
import { useMutation } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { saveSettings } from "@/actions";

interface FormProps {
  user: User;
}

export const formSchema = z.object({
  image: z.string().url(),
  name: z.string().min(2).max(50),
  bio: z.string().max(160).optional(),
});

const UserSettingsForm = ({ user }: FormProps) => {
  const { name, image, bio } = user;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: image as string,
      name: name as string,
      bio: bio || undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => saveSettings(values),
    onSuccess: () => {
      toast({
        title: "Settings saved",
        description: "Your settings have been successfully saved.",
      });

      //   queryClient.invalidateQueries(["user"]);

      router.refresh();
    },
    onError: (error: Error) => {
      toast({
        title: "An error occurred",
        description: error.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 shadow-md"
      >
        <div className="space-y-4 rounded-lg border dark:bg-zinc-900/60 p-4">
          <h4 className="mb-6 text-2xl font-semibold">Account</h4>
          <Avatar className="size-24">
            <AvatarImage
              src={image as string}
              width={96}
              height={96}
              alt={name as string}
              className="items-center justify-center object-cover"
            />
            <AvatarFallback>
              <UserIcon size={40} />
            </AvatarFallback>
          </Avatar>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Bio" {...field} />
                </FormControl>
                <FormDescription>
                  Brief description for your profile. Max 160 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="ml-auto"
            variant={"custom"}
          >
            {mutation.isPending && (
              <Loader2Icon size={16} className="mr-2 animate-spin" />
            )}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserSettingsForm;
