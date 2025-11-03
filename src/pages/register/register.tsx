import { SimpleLayout } from '@shared/ui/simple-layout';
import { GuestGuard } from '@features/guards';
import { RegisterForm } from '@features/auth';

export function RegisterPage() {
  return (
    <GuestGuard>
      <SimpleLayout>
        <RegisterForm />
      </SimpleLayout>
    </GuestGuard>
  );
}
