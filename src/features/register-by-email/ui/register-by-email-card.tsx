import { Paper, Typography } from '@mui/material';
import { RegisterByEmailForm } from './register-by-email-form';

export function RegisterByEmailCard() {
    return (
        <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
            <Typography variant='h5' align='center' gutterBottom>
                Реєстрація
            </Typography>
            <RegisterByEmailForm />
        </Paper>
    )
}