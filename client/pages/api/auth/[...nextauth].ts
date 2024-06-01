import axios from 'axios';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'hlpCredentials',
      credentials: {
        username: {
          label: 'Username',
        },
        isNewUser: {
          label: 'isNewUser',
          type: 'checkbox',
        },
        isSportsCenterOwner: {
          label: 'sportsCenterUser',
          type: 'checkbox',
        },
        password: { label: 'Password', type: 'password' },
        confirmPassword: { label: 'Password', type: 'password' },
        email: { label: 'Email', type: 'email' },
        name: { label: 'Name' },
      },
      async authorize(credentials) {
        if (credentials?.isNewUser != 'false') {
          // register flow
          try {
            const user = await axios.post<{ id: string }>(
              'http://localhost:3000/api/users/registerWithUsernameAndPassword',
              credentials,
            );
            return user.data;
          } catch (error) {
            return null;
          }
        } else {
          // log in flow
          try {
            const user = await axios.post<{ id: string }>(
              'http://localhost:3000/api/users/loginWithUsernameAndPassword',
              credentials,
            );
            return user.data;
          } catch (error) {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //@ts-ignore
        return { ...token, isSportsCenterOwner: user.isSportsCenterOwner };
      }
      return token;
    },
    async session({ session, token, user }) {
      // probably must fetch here hlpUser data
      if (user) {
        //@ts-ignore
        session.user.isSportsCenterOwner = user.isSportsCenterOwner;
      }
      return {
        ...session,
        user: {
          ...session.user,
          isSportsCenterOwner: token.isSportsCenterOwner,
        },
      };
    },
  },
};
export default NextAuth(authOptions);
