import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user }) {
      console.log('Sign in attempt:', {
        email: user.email,
        name: user.name,
      })
      
      const authorizedEmails = process.env.AUTHORIZED_EMAILS?.split(',') || []
      const isAuthorized = authorizedEmails.includes(user.email || '')
      
      console.log('Authorization result:', {
        isAuthorized,
        authorizedEmails
      })
      
      return isAuthorized
    },
    async redirect({ url, baseUrl }) {
      const trustedHosts = [
        'localhost:3000',
        'ai-agency-three.vercel.app'
      ]
      
      // Allow relative URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      
      // Check if the URL is trusted
      try {
        const urlObj = new URL(url)
        if (trustedHosts.includes(urlObj.host)) {
          return url
        }
      } catch {
        // Invalid URL, return to base
        return baseUrl
      }
      
      return baseUrl
    },
    async session({ session }) {
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  debug: process.env.NODE_ENV === 'development',
} 