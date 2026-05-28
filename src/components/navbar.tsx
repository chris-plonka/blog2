import { getCurrentUser } from "@/lib/get-current-user";
import Link from "next/link";
import Menu from "./menu";
import NewPostButton from "./new-post-button";

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-background/50 shadow-sm saturate-100 backdrop-blur-[10px] ">
      <div className="mx-auto flex h-[60px] max-w-4xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold">
          One Blog
        </Link>

        <div className="flex items-center gap-4">
          {user && <NewPostButton />}
          <Menu user={user} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
