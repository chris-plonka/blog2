import { getCurrentUser } from "@/lib/get-current-user";
import UserPost from "./_components/blog-card";
import { SITE_URL } from "@/lib/constants";
import { Metadata } from "next";
import { db } from "@/lib/db";

interface PostPageProps {
  params: {
    id: string;
  };
}
export const generateMetadata = async (
  props: PostPageProps
): Promise<Metadata> => {
  const { params } = props;
  const post = await db.post.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!post) return {};

  const ISOPublishedTime = new Date(post.createdAt).toISOString();
  const ISOModifiedTime = new Date(post.updatedAt).toISOString();

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      url: `${SITE_URL}/posts/${post.id}`,
      type: "article",
      title: post.title,
      description: post.description || undefined,
      publishedTime: ISOPublishedTime,
      modifiedTime: ISOModifiedTime,
      authors: `${SITE_URL}/users/${post.authorId}`,
      images: [
        {
          url: `${SITE_URL}/api/og?title=${post.title}`,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/png",
        },
      ],
    },
  };
};

const page = async (props: PostPageProps) => {
  const { params } = props;
  const { id } = params;

  const user = await getCurrentUser();

  return (
    <>
      <UserPost id={id} user={user} />
    </>
  );
};

export default page;
