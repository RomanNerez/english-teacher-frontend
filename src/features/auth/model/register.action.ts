'use server';

import { BackendService } from '@shared/api/backend';

export async function registerUser(formData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
}) {
    try {
        const response = await BackendService.register(formData);
        const { data } = response;

        if (response.status !== 201) {
            return { ok: false, data };
        }

        return { ok: true, data };
    } catch (err) {
        console.error('registerUser error:', err);
        return { ok: false, error: (err as Error).message };
    }
}
