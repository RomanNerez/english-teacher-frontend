'use server';

import { BackendService } from '@shared/api/backend';

export async function passwordResetAction(props: { token: string, email: string, password: string, confirm_password: string }) {
    try {
        const response = await BackendService.resetPassword(props);
        const { data } = response;

        if (response.status !== 204) {
            return { ok: false, data };
        }

        return { ok: true, data };
    } catch (err) {
        console.error('password forgot error:', err);
        return { ok: false, error: (err as Error).message };
    }
}
