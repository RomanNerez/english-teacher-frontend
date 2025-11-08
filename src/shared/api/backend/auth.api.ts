import { httpClient } from '@shared/api/http-client';
import { API_ENDPOINTS } from './endpoints';

export default {
    login<T>(data: T) {
        return httpClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
    },

    register<T>(data: T) {
        return httpClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
    },

    forgotPassword<T>(data: T) {
        return httpClient.post(API_ENDPOINTS.AUTH.PASSWORD_FORGOT, data);
    },

    resetPassword<T>(data: T & { token: string }) {
        return httpClient.post(API_ENDPOINTS.AUTH.PASSWORD_RESET(data.token), data);
    },

    checkResetPasswordToken<T>(token: string, params: T & { email: string }) {
        return httpClient.get(API_ENDPOINTS.AUTH.PASSWORD_RESET_CHECK(token), { params });
    },

    logout() {
        return httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    },

    me(accessToken: string) {
        return httpClient.get(API_ENDPOINTS.AUTH.ME, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
    }
}