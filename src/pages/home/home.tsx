import { AuthGuard } from '@features/guards';
import { Button } from '@shared/ui/button';

export async function HomePage() {
  return (
    <AuthGuard>
      <Button variant='contained'>Hello world</Button>
    </AuthGuard>
  );
}
