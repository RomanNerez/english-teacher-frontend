import { Paper, Typography } from '@mui/material';

type AuthCardProps = {
  children: React.ReactNode;
  title: string;
};

export function AuthCard({ children, title }: AuthCardProps) {
  return (
    <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
      <Typography variant='h5' align='center' gutterBottom>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
