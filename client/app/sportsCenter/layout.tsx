'use client';

import { useRouter } from 'next/navigation';
import { useSession } from '../../hooks/useSession';

export default function SportsCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/');
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const isSportsCenterOwner = data?.user?.isSportsCenterOwner;

  if (!isSportsCenterOwner) {
    router.replace('/');
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return <div>{children}</div>;
  }
}
