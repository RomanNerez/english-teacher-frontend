import { Box } from '@mui/material';
import { Card, CardContent, Typography } from '@mui/material';

type ModuleCardProps = {
  headerTitle: string;
  title: string;
};

export function ModuleCard({ headerTitle, title }: ModuleCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography>{headerTitle}</Typography>
        </Box>

        <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{title}</Typography>
      </CardContent>
    </Card>
  );
}
