import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import qs from "qs";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

interface CustomUser extends DefaultUser {
  name: string;
  email: string;
  id: string;
  role: string;
  token: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      id: string;
      role: string;
      token: string;
    } & DefaultSession;
  }

  interface User extends CustomUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    name: string;
    email: string;
    id: string;
    role: string;
    token: string;
  }
}
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
        admin: {},
      },
      async authorize(credentials, req) {
        const isAdmin = credentials?.admin === "true";
        const url = isAdmin
          ? `${process.env.NEXT_PUBLIC_SERVER}/user-service/employee/login`
          : `${process.env.NEXT_PUBLIC_SERVER}/user-service/customer/login`;

        const payload = isAdmin
          ? { username: credentials?.email, password: credentials?.password }
          : { email: credentials?.email, password: credentials?.password };

        const response = await axios.post(url, payload, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.data?.status === "200" && response.data?.data?.token) {
          return {
            ...response.data.data, // or map to your user object
            token: response.data.data.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          token: user.token,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (session && token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            role: token.role,
            token: token.token,
          },
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
