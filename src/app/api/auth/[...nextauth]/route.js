import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { z } from "zod";
import "@/lib/mongodb";

export const authOptions = {
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(creds) {
        const { email, password } = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .parse(creds);

        const user = await User.findOne({ email });
        if (!user) throw new Error("No user found");
        if (!(await bcrypt.compare(password, user.password)))
          throw new Error("Invalid credentials");

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          name: user.name,
          image: user.image,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      async profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        if (account.provider === "credentials") {
          token.sub = user.id;
          token.role = user.role;
          token.email = user.email;
          token.name = user.name;
          token.picture = user.image ?? null;
        } else if (account.provider === "google") {
          const dbUser = await User.findOneAndUpdate(
            { email: user.email },
            {
              $set: { name: user.name, image: user.image },

              $setOnInsert: { role: "student", password: null },
            },
            { upsert: true, new: true }
          );

          token.sub = dbUser._id.toString();
          token.role = dbUser.role;
          token.email = dbUser.email;
          token.name = dbUser.name;
          token.picture = dbUser.image;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.image = token.picture;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
