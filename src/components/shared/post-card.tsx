"use client";

import { type Like, type Post } from "@prisma/client";
import { BadgeCheck, HeartIcon } from "lucide-react";
import Link from "next/link";
import { type User } from "next-auth";
import * as React from "react";
import Image from "next/image";

import UserAvatar from "./user-avatar";
import Controls from "./controls";
import { formatPostDate } from "@/utilis/format-post-date";

export interface PostCardProps {
  post: Pick<
    Post,
    "id" | "title" | "description" | "published" | "createdAt" | "content"
  > & {
    likes: Array<Pick<Like, "id">>;
  } & {
    author: Pick<User, "name" | "image" | "id" | "isAdmin">;
  };
  user?: User | null;
  showAuthor?: boolean;
  queryKey: string;
}

const getFirstImageUrl = (htmlContent: string | null | undefined): string | null => {
  if (!htmlContent) return null;
  const match = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
};

const PostCard = (props: PostCardProps) => {
  const { post, user, showAuthor = true, queryKey } = props;
  const { id, title, description, published, createdAt, likes, author, content } = post;

  const firstImage = getFirstImageUrl(content);

  return (
    // bg-white (całe białe tło), border border-slate-200 (cienka szara obwódka)
    <article className="flex flex-col h-full border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow relative">
      
      {/* Warunkowe renderowanie zdjęcia: sekcja pojawia się TYLKO, gdy post zawiera obrazek */}
      {firstImage && (
        <Link 
          href={`/${published ? "posts" : "editor"}/${id}`} 
          className="relative w-full h-48 bg-slate-50 block overflow-hidden group border-b border-slate-100"
        >
          <Image
            src={firstImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={firstImage.startsWith('data:image')}
          />
        </Link>
      )}

      {/* Kontener na treść pod zdjęciem */}
      <div className="flex flex-col flex-grow p-5 justify-between gap-4">
        
        <div className="space-y-3">
          {/* Autor i data */}
          <div className="flex items-center gap-1 text-muted-foreground">
            {showAuthor && (
              <>
                <Link
                  href={`/users/${author.id}`}
                  className="flex items-center gap-1 text-sm text-slate-700 hover:underline"
                >
                  <UserAvatar
                    userId={author.id}
                    src={author.image}
                    alt={author.name}
                    className="w-5 h-5"
                  />
                  <span className="font-medium">{author.name}</span>
                  {author.isAdmin && (
                    <BadgeCheck size={14} className="text-black fill-blue-500" />
                  )}
                </Link>
                <span>·</span>
              </>
            )}
            <span className="text-xs">{formatPostDate(createdAt)}</span>
          </div>

          {/* Tytuł i opis */}
          <Link
            href={`/${published ? "posts" : "editor"}/${id}`}
            className="block space-y-2 group"
          >
            <h2 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h2>
            <p className="line-clamp-4 text-sm text-slate-600 leading-relaxed">
              {description}
            </p>
          </Link>
        </div>

        {/* Dolny pasek: polubienia oraz przyciski kontrolne */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
            <HeartIcon size={18} className="text-red-500 fill-red-500" />
            <span>{likes.length}</span>
          </div>
          
          <div className="z-10">
            <Controls
              user={user}
              id={id}
              authorId={author.id}
              postTitle={title}
              querykey={queryKey}
            />
          </div>
        </div>

      </div>
    </article>
  );
};

export default PostCard;
