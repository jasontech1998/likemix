import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const SpotifyScope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative playlist-modify-private";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
      authorization: {
        params: { scope: SpotifyScope },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token
    },
    async session({session, token}) {
    if(session) {
      session = Object.assign({}, session, {accessToken: token.accessToken})
      }
    return session
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
