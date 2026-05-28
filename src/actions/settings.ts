"use server";

import { formSchema } from "@/app/(app)/me/settings/_components/form";
import { db } from "@/lib/db";

import { getCurrentUser } from "@/lib/get-current-user";
import { z } from "zod";
type Values = z.infer<typeof formSchema>;

export const saveSettings = async (values: Values) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Not logged in");

  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...values,
      },
    });
  } catch {
    throw new Error("Something went wrong. Please try again.");
  }
};

export const deleteAccount = async () => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Not logged in");

  try {
    await db.user.delete({
      where: {
        id: user.id,
      },
    });
  } catch {
    throw new Error("Something went wrong. Please try again.");
  }
};
