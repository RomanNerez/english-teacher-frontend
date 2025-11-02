import { AuthGuard } from '@features/guards';
import { StudentLayout } from '@/src/shared/ui/student-layout';
import { ModuleList } from '@/src/features/modules';

export async function HomePage() {
  return (
    <AuthGuard>
      <StudentLayout>
        <ModuleList />
      </StudentLayout>
    </AuthGuard>
  );
}
