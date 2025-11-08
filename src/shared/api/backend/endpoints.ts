const API_PREFIX = 'api';
const API_VERSION = 'v1';

const getUrl = (path: string) => `/${API_PREFIX}/${API_VERSION}/${path}`;

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: getUrl('login'),
        REGISTER: getUrl('register'),
        PASSWORD_FORGOT: getUrl('password/forgot'),
        PASSWORD_RESET: (token: string) => getUrl(`password/reset/${token}`),
        PASSWORD_RESET_CHECK: (token: string) => getUrl(`password/reset/${token}/check`),
        LOGOUT: getUrl('logout'),
        ME: getUrl('me'),
    },
};