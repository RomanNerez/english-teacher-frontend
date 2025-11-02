import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';

type ModuleListLayout = BoxProps;

export function ModuleListLayout({ children, ...props }: ModuleListLayout) {
  return (
    <Box display='flex' flexDirection='column' gap={2} {...props}>
      {children}
    </Box>
  );
}
