import { Box, Button, Stack } from '@mui/material';
import { ModuleCard } from '../ui/module-card';
import { ModuleListLayout } from '../ui/module-list-layout';

export function ModuleList() {
  return (
    <Stack spacing={2}>
      <Button variant='contained' href='/modules/editor'>
        Create Module
      </Button>
      <ModuleListLayout>
        <ModuleCard headerTitle='70 термінів' title='Страница 5 Колонка 1' />
      </ModuleListLayout>
    </Stack>
  );
}
