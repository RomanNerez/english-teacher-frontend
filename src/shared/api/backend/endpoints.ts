const API_PREFIX = 'api';
const API_VERSION = 'v1';

const getUrl = (path: string) => `/${API_PREFIX}/${API_VERSION}/${path}`;

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: getUrl('login'),
        LOGOUT: getUrl('logout'),
        ME: getUrl('me'),
    },
};