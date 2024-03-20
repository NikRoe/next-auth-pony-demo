import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User";
import clientPromise from "@/db/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth/next";

import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authetication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async session({ session, user }) {
      dbConnect();

      const currentUser = await User.findById(user.id);

      if (currentUser.favoritePonies == null) {
        currentUser.favoritePonies = [];
        currentUser.save();
      }

      return { ...session, user: { ...session.user, id: user.id } };
    },
  },
};

export default NextAuth(authOptions);
