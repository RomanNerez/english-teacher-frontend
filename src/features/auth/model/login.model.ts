'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from '@shared/ui/snackbar';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormValues, loginSchema } from '../lib/login-schema';

export function useLogin() {
    const router = useRouter();
    const methods = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });
    const { handleSubmit } = methods;

    const onSubmit = handleSubmit(async ({ email, password, remember }) => {
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            remember,
            callbackUrl: '/',
        });

        if (result?.ok) {
            router.push('/');
        } else {
            toast.error(result?.error);
            console.error(result?.error);
        }
    });

    return {
        methods,
        onSubmit
    }
}