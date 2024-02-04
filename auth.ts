import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";

import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore, firestore_auth } from "lib/firebase"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string,
      sub: string,
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          const user = userCredential.user;
          console.log(`user found`, user);
          // Return user object if authentication succeeds
          if (user) {
            return { id: user.uid, name: user.displayName || '', email: user.email || '' };
          }
        } catch (error) {
          console.error(error);
        }
        return null;
      }
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.id = String(profile.sub ?? profile.id);
        token.image = profile.avatar_url || profile.picture; 
      }
      return token
    },
    session: ({ session, token }) => {
      if (session?.user && token?.id) {
        session.user.id = String(token.id)
      }
      return session
    },
    authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})
