import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        // Debug logs (enable in production by setting AUTH_DEBUG=true)
        if (process.env.NODE_ENV !== 'production' || process.env.AUTH_DEBUG === 'true') {
          try {
            console.log('[auth] authorize: email=', credentials.email)
            console.log('[auth] found user=', !!user)
            if (user) console.log('[auth] user.isVerified=', user.isVerified)
            if (user) console.log('[auth] user.hasPassword=', !!user.password)
          } catch (e) {
            console.error('[auth] debug error', e)
          }
        }
        if (!user || !user.password) return null
        if (!user.isVerified) return null
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (process.env.NODE_ENV !== 'production' || process.env.AUTH_DEBUG === 'true') console.log('[auth] password valid=', isValid)
        if (!isValid) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
  },
}
