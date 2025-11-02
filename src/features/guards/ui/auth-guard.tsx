'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../model/use-check-session';
import { FullScreenLoader } from '@shared/ui/full-screen-loader';

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { status, isLoading, isUnauthenticated } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading()) return;

    if (isUnauthenticated()) router.replace('/login');
  }, [status, router]);

  if (isLoading()) {
    return <FullScreenLoader />;
  }

  if (isUnauthenticated()) {
    return null;
  }

  return <>{children}</>;
}
