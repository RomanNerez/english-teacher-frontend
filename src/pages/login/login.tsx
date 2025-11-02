import { GuestGuard } from '@/src/features/guards';
import { SimpleLayout } from '@/src/shared/ui/simple-layout';
import { LoginForm } from '@features/auth';

export function LoginPage() {
  return (
    <GuestGuard>
      <SimpleLayout>
        <LoginForm />
      </SimpleLayout>
    </GuestGuard>
  );
}
