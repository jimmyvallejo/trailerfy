import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@app/models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user user:email",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          await connectToDB();

          const { password, email } = credentials.body;

          let user = await User.findOne({ email: email });

          const doesMatch = await bcrypt.compare(password, user.password);

          if (doesMatch) {
            return Promise.resolve(user);
          } else {
            console.log("Password Does not Match");
            return Promise.resolve(null);
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      let sessionUser = await User.findOne({ email: session.user.email });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      } else {
        console.log("Session user not found in DB");
      }
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        let userExists;

        profile
          ? (userExists = await User.findOne({ email: profile.email }))
          : (userExists = await User.findOne({ email: user.email }));

        if (!userExists && profile !== undefined) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
