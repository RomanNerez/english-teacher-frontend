'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from '@shared/ui/snackbar';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordResetFormValues, passwordResetSchema } from '../lib/password-reset-schema';
import { passwordResetAction } from './password-reset.action';

export function usePasswordReset({ email, token }: { email: string, token: string }) {
    const router = useRouter();
    const methods = useForm<PasswordResetFormValues>({
        resolver: zodResolver(passwordResetSchema),
        defaultValues: {
            token,
            email,
            password: '',
            confirm_password: '',
        },
    });
    const { handleSubmit, setError } = methods;

    const onSubmit = handleSubmit(async (data) => {
        const result = await passwordResetAction(data);

        if (result?.ok) {
            toast.success('Пароль був змінений успішно!');
            router.push('/login');
        } else {
            toast.error(result?.data?.message);
            const errors = result?.data?.errors || [];

            for (const key in errors) {
                const message = errors[key]?.[0] || '';

                if (message) {
                    setError(key as keyof PasswordResetFormValues, {
                        type: 'server',
                        message
                    });
                }
            }
        }
    });

    return {
        onSubmit,
        methods,
    }
}