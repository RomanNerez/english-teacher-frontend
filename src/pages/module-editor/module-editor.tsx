import { AuthGuard } from '@/src/features/guards';
import { ModuleEditor } from '@/src/features/modules';
import { StudentLayout } from '@/src/shared/ui/student-layout';
import { Box, Button } from '@mui/material';

export function ModuleEditorPage() {
  return (
    <AuthGuard>
      <StudentLayout>
        <Box>
          <Button href='/'>Повернутися до модулив</Button>
        </Box>

        <ModuleEditor />
      </StudentLayout>
    </AuthGuard>
  );
}
