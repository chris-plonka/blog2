"use client";

import { UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { buttonVariants } from "./ui/button";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

interface MenuProps {
  user: User | undefined;
}

const Menu = (props: MenuProps) => {
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const { user } = props;
  const pathname = usePathname();

  if (!user) {
    return (
      <Link href={`/login?redirect=${pathname}`} className={buttonVariants()}>
        Log in
      </Link>
    );
  }

  const { name, image, email, id } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={image as string}
            alt={name as string}
            className="object-cover"
          />
          <AvatarFallback>
            <UserIcon size={24} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex-col items-start" asChild>
          <Link href={`/users/${id}`}>
            <div className="text-sm">{name}</div>
            <div className="text-xs text-muted-foreground">{email}</div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/me/posts">Posts</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/me/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={switchTheme}>
          Switch Appearence
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            target="_blank"
            href="mailto:akshaymoolya88@gmail.com?subject=Bug%20Report%20for%20Threads%20Application"
          >
            Report a bug
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a target="_blank" href="https://Akshay33.vercel.app">
            About Me
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
