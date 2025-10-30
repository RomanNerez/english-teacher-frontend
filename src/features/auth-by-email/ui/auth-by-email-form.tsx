'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import Box from '@mui/material/Box';
import { TextField } from '@shared/ui/text-field';
import { Button } from '@shared/ui/button';
import { Link } from '@mui/material';
import { useRouter } from 'next/navigation';

export function AuthByEmailForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // const result = await signIn('credentials', {
        //     redirect: false,
        //     email,
        //     password,
        //     callbackUrl: '/',
        // });

        // console.log(result);

        await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, remember: false }),
        });

        // if (res.ok) {
        //     router.push('/');
        // } else {
        //     const data = await res.json();
        //     console.log(data.error);
        // }
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextField
                label='Email'
                type='email'
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <Box display='flex' flexDirection='column'>
                <Link href='/password/forgot' textAlign='end'>
                    Забули пароль?
                </Link>
                <TextField
                    label='Пароль'
                    type='password'
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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