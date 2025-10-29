import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { Footer } from './footer';

interface SimpleLayoutProps {
  children: ReactNode;
}

export const SimpleLayout = ({ children }: SimpleLayoutProps) => {
  return (
    <Box display='flex' flex={'1 1 auto'} flexDirection="column" minHeight="100%">
      <Container
        maxWidth="sm"
        sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
