"use client";

import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";

type UserAvatarProps = {
  userId: string;
  src: string | null;
  alt: string | null;
  fill?: boolean;
  className?: string;
  height?: number;
  width?: number;
} & Omit<ImageProps, "src" | "alt">;

const UserAvatar = (props: UserAvatarProps) => {
  const { userId, src, alt, fill, className, width, height, ...rest } = props;

  return (
    <Image
      src={src ?? `https://robohash.org/${userId}`}
      alt={alt ?? `${userId}'s avatar`}
      fill={fill}
      width={fill ? width : 24}
      height={fill ? height : 24}
      className={cn(
        "rounded-full items-center justify-center object-cover",
        className
      )}
      quality={100}
      {...rest}
    />
  );
};

export default UserAvatar;
