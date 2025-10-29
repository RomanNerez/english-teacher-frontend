import Box from '@mui/material/Box';
import { TextField } from '@shared/ui/text-field';
import { Button } from '@shared/ui/button';
import { Link } from '@mui/material';

export function AuthByEmailForm() {
    return (
        <Box
            component='form'
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextField label='Email' type='email' required />
            <Box display='flex' flexDirection='column'>
                <Link href='/password/forgot' textAlign='end'>
                    Забули пароль?
                </Link>
                <TextField
                    label='Пароль'
                    type='password'
                    required
                />
            </Box>
            <Button type='submit'>
                Увійти
            </Button>
            <Link href='/register' textAlign='center'>
                Зареєструватися
            </Link>
        </Box>
    )
}