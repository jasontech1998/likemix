import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, account}) {
      console.log("JWT Callback - token:", token, "account:", account);
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token });
      }
      return token
    },
    async session({session, token}) {
    console.log("Session Callback - session:", session, "token:", token);
    if(session) {
      session = Object.assign({}, session, {access_token: token.access_token})
      }
    return session
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
