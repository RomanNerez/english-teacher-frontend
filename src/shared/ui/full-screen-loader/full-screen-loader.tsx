'use client';

import { Box, CircularProgress } from '@mui/material';

export function FullScreenLoader() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}
