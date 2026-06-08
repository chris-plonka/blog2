import type { InferSelectModel } from 'prisma'
import type { DefaultSession, NextAuthConfig } from 'next-auth'
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from 'next-auth';
import { Adapter } from "next-auth/adapters";
import { db } from "./db";
import { cache } from 'react';
import { getDefaultImage } from '@/utilis/get-default-image'

declare module 'next-auth' {
  interface Session extends Omit<DefaultSession, 'user'> {
    user: InferSelectModel<typeof users>
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- extend interface
  interface User extends InferSelectModel<typeof users> {}
 }
  
const config: NextAuthOptions = {
secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          bio: user.bio

  },
  
}},
}
};
 
 
   
 export const getCurrentUser = cache(async () => {
  const session = await auth()

  if (!session?.user) {
    return null
  } 

  const defaultImage = getDefaultImage(session.user.id) 

  return {
    ...session.user,
    name: session.user.name,
    image: session.user.image ?? defaultImage,
  } 
 })
