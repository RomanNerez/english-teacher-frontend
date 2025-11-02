'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../model/use-check-session';
import { FullScreenLoader } from '@shared/ui/full-screen-loader';

type AuthGuardProps = {
  children: ReactNode;
};

export function GuestGuard({ children }: AuthGuardProps) {
  const { status, isLoading, isAuthenticated } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading()) return;

    if (isAuthenticated()) router.replace('/');
  }, [status, router]);

  if (isLoading()) {
    return <FullScreenLoader />;
  }

  if (isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
