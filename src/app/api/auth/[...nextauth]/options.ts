import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import { connectDB } from "@/db/dbConfig";
import { UserModel } from "@/db/Models/UserModel";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    Credentials({
      name: "credentials",
      credentials: {},

      async authorize(credentials: any): Promise<any> {
        try {
          await connectDB();
          const { email, password } = credentials;

          if (!email || !password) {
            return null;
          }

          const isUser = await UserModel.findOne({ email });

          if (!isUser) {
            return null;
          }

          const isPasswordMatch = bcrypt.compareSync(password, isUser.password);

          if (!isPasswordMatch) {
            return null;
          }

          return {
            id: isUser._id,
            username: isUser.username,
            email: isUser.email,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (
        account &&
        (account.provider === "google" || account.provider === "github")
      ) {
        const { name, email } = user;

        if (!name || !email) {
          return false;
        }

        try {
          await connectDB();
          const isUser = await UserModel.findOne({ email });

          if (isUser) {
            user.id = isUser._id;
            user.username = isUser.username;
            return true;
          }

          const newUser = new UserModel({
            username: name,
            email,
          });

          const resp = await newUser.save();
          user.id = resp._id;
          user.username = resp.username;

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};
