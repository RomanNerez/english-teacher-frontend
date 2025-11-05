import { z } from 'zod';

export const passwordResetSchema = z.object({
    token: z.string().nonempty(),
    email: z.email({ message: 'Невірний email' }),
    password: z.string().nonempty({ message: 'Пароль обовʼязковий' }).min(8),
    confirm_password: z.string().nonempty({ message: 'Пароль обовʼязковий' }),
}).refine((data) => data.password === data.confirm_password, {
    message: 'Пароль не співпадає',
    path: ['confirm_password'],
});

export type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;
