import { z } from 'zod';

export const registerSchema = z.object({
    first_name: z.string().nonempty({ message: 'Імʼя обовʼязкове' }),
    last_name: z.string().nonempty({ message: 'Призвіще обовʼязкове' }),
    email: z.email({ message: 'Невірний email' }),
    password: z.string().nonempty({ message: 'Пароль обовʼязковий' }).min(8),
    confirm_password: z.string().nonempty({ message: 'Пароль обовʼязковий' }),
}).refine((data) => data.password === data.confirm_password, {
    message: 'Пароль не співпадає',
    path: ['confirm_password'],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
