import { httpClient } from '@shared/api/http-client';
import { API_ENDPOINTS } from './endpoints';

export default {
    login<T>(data: T) {
        return httpClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
    },

    register<T>(data: T) {
        return httpClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
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