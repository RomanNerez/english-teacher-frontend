import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email({ message: 'Невірний email' }),
    password: z.string().nonempty({ message: 'Пароль обовʼязковий' }),
    remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
