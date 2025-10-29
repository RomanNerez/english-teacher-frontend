import Box from '@mui/material/Box';
import { TextField } from '@shared/ui/text-field';
import { Button } from '@shared/ui/button';
import { Link } from '@mui/material';

export function RegisterByEmailForm() {
    return (
        <Box
            component='form'
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextField label='Імя' type='email' required />
            <TextField label='Призвіще' type='email' required />
            <TextField label='Email' type='email' required />
            <TextField
                label='Пароль'
                type='password'
                required
            />
            <TextField
                label='Підтвердити Пароль'
                type='password'
                required
            />
            <Button type='submit'>
                Зареєструватися
            </Button>
            <Link href='/login' textAlign='center'>
                Увійти
            </Link>
        </Box>
    )
}