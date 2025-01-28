import NextAuth from "next-auth"
import Facebook from "next-auth/providers/facebook"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "./lib/db"
import { encode } from "next-auth/jwt"
import { v4 as uuid } from "uuid"
import bcrypt from "bcryptjs"

const adapter = PrismaAdapter(db)

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [Google, Facebook, Credentials({
    credentials: {
      emailAddress: {},
      password: {}
    },
    authorize: async (credentials) => {
      const user = await db.user.findFirst({
        where: { emailAddress: credentials.emailAddress }
      });

      if (!user) {
        throw new Error('Email Address does not exit. Kindly create an account!')
      }

      const isValidAuth = bcrypt.compare(credentials.password, user.hashedPassword)

      if (!isValidAuth) {
        throw new Error('Password is incorrect!')
      }

      return user
    }
  })],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true
      }

      return token
    }
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found!")
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        })

        if (!createdSession) {
          throw new Error("Failed to create session")
        }

        return sessionToken;
      }
      return encode(params)
    },
  }
})
