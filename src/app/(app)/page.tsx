import Posts from "./_component/posts";
import { getCurrentUser } from "@/lib/get-current-user";

export default async function Home() {
  const user = await getCurrentUser();

  return <Posts user={user} />;
}
