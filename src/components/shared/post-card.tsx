"use client";

import { type Like, type Post } from "@prisma/client";
import { BadgeCheck, HeartIcon } from "lucide-react";
import Link from "next/link";
import { type User } from "next-auth";
import * as React from "react";
import Image from "next/image"; // 1. Importujemy komponent Image z Next.js

import UserAvatar from "./user-avatar";
import Controls from "./controls";
import { formatPostDate } from "@/utilis/format-post-date";

export interface PostCardProps {
  post: Pick<
    Post,
    // 2. Dodajemy "imageUrl" (lub "coverImage" - zależnie jak masz w Prisma) do typu Pick
    "id" | "title" | "description" | "published" | "createdAt" | "imageUrl"
  > & {
    likes: Array<Pick<Like, "id">>;
  } & {
    author: Pick<User, "name" | "image" | "id" | "isAdmin">;
  };
  user?: User | null;
  showAuthor?: boolean;
  queryKey: string;
}

const PostCard = (props: PostCardProps) => {
  const { post, user, showAuthor = true, queryKey } = props;
  // 3. Destrukturyzujemy imageUrl z obiektu post
  const { id, title, description, published, createdAt, likes, author, imageUrl } = post;

  return (
    // 4. Zmieniamy strukturę na flex-col, dodajemy zaokrąglenia i pełną wysokość h-full dla równego gridu
    <article className="flex flex-col h-full border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow relative">
      
      {/* 5. Sekcja zdjęcia na górze kafelka */}
      <Link 
        href={`/${published ? "posts" : "editor"}/${id}`} 
        className="relative w-full h-48 bg-slate-100 dark:bg-slate-800 block overflow-hidden group"
      >
        <Image
          src={imageUrl || '/placeholder.jpg'} // Jeżeli post nie ma zdjęcia, pokaże się placeholder z folderu /public
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* 6. Kontener na treść pod zdjęciem */}
      <div className="flex flex-col flex-grow p-4 justify-between gap-4">
        
        <div className="space-y-3">
          {/* Autor i data */}
          <div className="flex items-center gap-1 text-muted-foreground">
            {showAuthor && (
              <>
                <Link
                  href={`/users/${author.id}`}
                  className="flex items-center gap-1 text-sm text-slate-700 dark:text-slate-300 hover:underline"
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
            <h2 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h2>
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {description}
            </p>
          </Link>
        </div>

        {/* Dolny pasek: polubienia oraz przyciski kontrolne */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400">
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
