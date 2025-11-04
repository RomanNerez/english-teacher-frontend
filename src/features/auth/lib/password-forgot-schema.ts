import { z } from 'zod';

export const passwordForgotSchema = z.object({
    email: z.email({ message: 'Невірний email' }),
});

export type PasswordForgotFormValues = z.infer<typeof passwordForgotSchema>;
