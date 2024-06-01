import { Session } from 'next-auth';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Providers from './providers';
import { headers } from 'next/headers';

async function getSession(cookie: string): Promise<Session> {
  // this should be ofc changed - works locally
  const response = await fetch('http://localhost:3000/api/auth/session', {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get('cookie') ?? '');
  return (
    <html>
      <head>
        <title>{`Hi, let's play!`}</title>
      </head>
      <body
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Providers session={session}>
          <Navbar />
          <div style={{ flexGrow: '1' }}>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
