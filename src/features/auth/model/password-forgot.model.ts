'use client';

import { useForm } from 'react-hook-form';
import { toast } from '@shared/ui/snackbar';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordForgotFormValues, passwordForgotSchema } from '../lib/password-forgot-schema';
import { passwordForgotAction } from './password-forgot.action';
import { useBoolean } from '@/src/shared/hooks/use-boolean';

export function usePasswordForgot() {
    const hasEmailSent = useBoolean();
    const methods = useForm<PasswordForgotFormValues>({
        resolver: zodResolver(passwordForgotSchema),
        defaultValues: {
            email: '',
        },
    });
    const { handleSubmit, setError } = methods;

    const onSubmit = handleSubmit(async ({ email }) => {
        const result = await passwordForgotAction(email);

        if (result?.ok) {
            hasEmailSent.onTrue();
        } else {
            toast.error(result?.data?.message);
            console.error(result?.data?.message);

            const errors = result?.data?.errors || [];

            for (const key in errors) {
                const message = errors[key]?.[0] || '';

                if (message) {
                    setError(key as keyof PasswordForgotFormValues, {
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
        hasEmailSent
    }
}