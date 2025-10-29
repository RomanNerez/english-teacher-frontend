import { Paper, Typography } from '@mui/material';
import { PasswordForgotForm } from './password-forgot-form';

export function PasswordForgotCard() {
    return (
        <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
            <Typography variant='h5' align='center' gutterBottom>
                Відновлення паролю
            </Typography>
            <PasswordForgotForm />
        </Paper>
    )
}