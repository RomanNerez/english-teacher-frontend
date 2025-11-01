import { GuestGuard } from '@/src/features/guards';
import { SimpleLayout } from '@/src/shared/ui/simple-layout';
import { AuthByEmailCard } from '@features/auth';

export function LoginPage() {
  return (
    <GuestGuard>
      <SimpleLayout>
        <AuthByEmailCard />
      </SimpleLayout>
    </GuestGuard>
  );
}
