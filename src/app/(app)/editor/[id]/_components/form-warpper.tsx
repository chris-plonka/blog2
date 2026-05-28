"use client";

import { getPostById } from "@/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Form from "./form";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface formWrapperProps {
  id: string;
}

const FormWrapper = ({ id }: formWrapperProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getPostById", id],
    queryFn: () => getPostById(id),
  });

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-20" /> {/* Back button skeleton */}
          <Skeleton className="h-10 w-10" /> {/* Settings button skeleton */}
        </div>
        <div className="my-8 space-y-6">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-5 w-20" /> {/* Label skeleton */}
            <Skeleton className="h-10 w-full" /> {/* Input skeleton */}
          </div>
          <div className="flex w-full flex-col gap-1.5">
            <Skeleton className="h-5 w-24" /> {/* Label skeleton */}
            <Skeleton className="h-24 w-full" /> {/* Textarea skeleton */}
          </div>
          <Skeleton className="h-64 w-full" /> {/* Editor skeleton */}
          <div className="flex justify-between">
            <Skeleton className="h-10 w-32" />{" "}
            {/* Save as draft button skeleton */}
            <Skeleton className="h-10 w-24" /> {/* Publish button skeleton */}
          </div>
        </div>
      </>
    );
  }

  if (!data) {
    return notFound();
  }

  return <Form post={data} />;
};

export default FormWrapper;
