// next-auth.d.ts
import "next-auth";
import "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string | null;
    displayName?: string | null;
  }

  interface Session extends DefaultSession {
    user: {
      id?: string;
      username?: string | null;
      displayName?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string | null;
    displayName?: string | null;
  }
}
