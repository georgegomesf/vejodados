import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  database: process.env.DATABASE_URL,
  callbacks: {
    redirect: async (url, _) => {
      if (url === '/') {
        return Promise.resolve('/')
      }
      return Promise.resolve(url)
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
