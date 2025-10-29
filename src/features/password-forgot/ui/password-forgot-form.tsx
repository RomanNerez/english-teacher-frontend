import Box from '@mui/material/Box';
import { TextField } from '@shared/ui/text-field';
import { Button } from '@shared/ui/button';
import { Link } from '@mui/material';

export function PasswordForgotForm() {
    return (
        <Box
            component='form'
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextField label='Email' type='email' required />
            <Button type='submit'>
                Отримати посилання
            </Button>
            <Link href='/login' textAlign='center'>
                Увійти
            </Link>
        </Box>
    )
}