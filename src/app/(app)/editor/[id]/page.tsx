import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/get-current-user";
import FormWrapper from "./_components/form-warpper";

interface EditorPageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Editor",
};

const EditorPage = async (props: EditorPageProps) => {
  const { params } = props;
  const { id } = params;

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?redirect=/editor/${id}`);
  }

  return <FormWrapper id={id} />;
};

export default EditorPage;
