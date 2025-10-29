import { Paper, Typography } from '@mui/material';
import { AuthByEmailForm } from './auth-by-email-form';

export function AuthByEmailCard() {
    return (
        <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
            <Typography variant='h5' align='center' gutterBottom>
                Вхід
            </Typography>
            <AuthByEmailForm />
        </Paper>
    )
}