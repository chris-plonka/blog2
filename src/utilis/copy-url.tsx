import { toast } from "@/components/ui/use-toast";

export const copyUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "The link has been copied to your clipboard.",
    });
  } catch (error) {
    toast({
      title: "Failed to copy link",
      description: (error as Error).message,
      variant: "destructive",
    });
  }
};
