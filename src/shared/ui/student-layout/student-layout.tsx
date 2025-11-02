'use client';

import { Button } from '@shared/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Box, Container } from '@mui/material';
// NEED TO DO DECOMPOSITION
import { Footer } from '@/src/shared/ui/simple-layout/footer';
import { signOut } from 'next-auth/react';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();

    router.push('/profile');
  };

  const handleSignOut = async () => {
    handleMenuClose();
    await signOut();
  };

  return (
    <AppBar position='static' color='primary' sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button color='inherit' variant='text' sx={{ fontWeight: 500 }}>
            Модулі
          </Button>
        </Box>

        <Box>
          <IconButton onClick={handleMenuOpen} size='small' sx={{ p: 0 }}>
            <Avatar alt='User Avatar' src='/static/images/avatar/1.jpg' />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleProfile}>Профіль</MenuItem>
            <MenuItem onClick={handleSignOut}>Вийти</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

type StudentLayoutProps = {
  children: React.ReactNode;
};

export function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <>
      <Header></Header>
      <main id='root__layout'>
        <Container maxWidth='md' sx={{ py: 2 }}>
          <Box display='flex' flexDirection='column' gap={2}>
            {children}
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}
