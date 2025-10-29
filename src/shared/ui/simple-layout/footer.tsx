import { Box, Typography, Link } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      component="footer"
      py={2}
      textAlign="center"
      bgcolor="grey.100"
      mt="auto"
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} English Teacher. All rights reserved.{' '}
        <Link href="/privacy" underline="hover">Privacy Policy</Link>
      </Typography>
    </Box>
  );
};
