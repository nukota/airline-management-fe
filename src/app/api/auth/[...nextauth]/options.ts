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
      },
      async authorize(credentials, req) {
        const isStaff = req.body?.admin;
        console.log(typeof isStaff);
        if (isStaff === "false") {
          try {
            const url = `${process.env.NEXT_PUBLIC_SERVER}/customer/login`;
            const config = {
              method: "post",
              maxBodyLength: Infinity,
              url: url,
              headers: {},
              data: qs.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            };
            const response = await axios.request(config);

            if (response.status === 200) {
              const user = response.data.customer;
              return {
                name: user.fullname,
                email: user.email,
                role: null,
                id: user.customerId,
                token: response.data.token,
              };
            }
            return null;
          } catch (error: any) {
            if (error) throw new Error(error.response.data.message);
            return null;
          }
        } else if (isStaff === "true") {
          try {
            const url = `${process.env.NEXT_PUBLIC_SERVER}/staff/login`;
            const config = {
              method: "post",
              maxBodyLength: Infinity,
              url: url,
              headers: {},
              data: qs.stringify({
                username: credentials?.email,
                password: credentials?.password,
              }),
            };
            const response = await axios.request(config);
            if (response.status === 200) {
              const user = response.data.staff;
              return {
                name: user.username,
                email: user.email,
                role: user.role,
                id: user.staffId,
                token: response.data.token,
              };
            }
            return null;
          } catch (error: any) {
            //console.log("Test :", error.response.data);
            if (error) throw new Error(error.response.data.message);
            return null;
          }
        } else return null;
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
