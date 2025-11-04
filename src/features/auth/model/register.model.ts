'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from '@shared/ui/snackbar';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormValues, registerSchema } from '../lib/register-schema';
import { registerUser } from './register.action';

export function useRegister() {
    const router = useRouter();
    const methods = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
    });
    const { handleSubmit, setError } = methods;

    const onSubmit = handleSubmit(async (data) => {
        const result = await registerUser(data);

        if (result?.ok) {
            toast.success('Реєстрація пройшла успішно!');
            router.push('/login');
        } else {
            toast.error(result?.data?.message);
            const errors = result?.data?.errors || [];

            for (const key in errors) {
                const message = errors[key]?.[0] || '';

                if (message) {
                    setError(key as keyof RegisterFormValues, {
                        type: 'server',
                        message
                    });
                }
            }
        }
    });

    return {
        methods,
        onSubmit
    }
}