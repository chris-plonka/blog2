import { getCurrentUser } from "@/lib/get-current-user";
import UserPosts from "./_components/user-posts";
import UsersPost from "./_components/user-posts";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { SITE_URL } from "@/lib/constants";

type UserPageProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async (
  props: UserPageProps
): Promise<Metadata> => {
  const { params } = props;
  const id = params.id;
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return {};
  }

  return {
    title: user.name || user.id,
    description: user.bio,
    openGraph: {
      title: user.name || user.id,
      description: user.bio || undefined,
      type: "profile",
      url: `${SITE_URL}/users/${user.id}`,
    },
  };
};

const UserPage = async (props: UserPageProps) => {
  const { params } = props;
  const { id } = params;
  const currentUser = await getCurrentUser();

  return (
    <>
      <UsersPost user={currentUser} id={id} />
    </>
  );
};

export default UserPage;
