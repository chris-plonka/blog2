"use client";
import { Skeleton } from "./ui/skeleton";

const UserPostPlaceholder = () => (
  <div className="p-4">
    {/* Header section */}
    <div className="flex items-center justify-between mb-6">
      <Skeleton className="h-8 w-24 rounded-md" />{" "}
      {/* Placeholder for Back button */}
      <Skeleton className="h-8 w-24 rounded-md" />{" "}
      {/* Placeholder for Controls */}
    </div>
    {/* Title and description section */}
    <div className="my-8">
      <Skeleton className="h-8 w-3/4 rounded-md" />{" "}
      {/* Placeholder for title */}
      <Skeleton className="h-4 w-full mt-4 rounded-md" />{" "}
      {/* Placeholder for description */}
    </div>
    {/* User info section */}
    <div className="flex items-center gap-3 mb-6">
      <Skeleton className="h-10 w-10 rounded-full" />{" "}
      {/* Placeholder for UserAvatar */}
      <div className="text-sm">
        <Skeleton className="h-4 w-32 rounded-md" />{" "}
        {/* Placeholder for user name */}
        <Skeleton className="h-3 w-24 mt-1 rounded-md" />{" "}
        {/* Placeholder for post date */}
      </div>
    </div>
    {/* Content section */}
    <div className="my-8">
      <Skeleton className="h-4 w-full mb-4 rounded-md" />{" "}
      {/* Placeholder for content line */}
      <Skeleton className="h-4 w-full mb-4 rounded-md" />{" "}
      {/* Placeholder for content line */}
      <Skeleton className="h-4 w-full rounded-md" />{" "}
      {/* Placeholder for content line */}
    </div>
    {/* LikeButton section */}
    <Skeleton className="h-8 w-24 rounded-md" />{" "}
    {/* Placeholder for LikeButton */}
  </div>
);

export default UserPostPlaceholder;
