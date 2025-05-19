import { env } from '$env/dynamic/private';

const baseUrl =
    process.env.NODE_ENV === 'production'
        ? `https://${env.PROD_API_BASE_URL}`
        : `http://${env.DEV_API_BASE_URL}/api`;

export const getBaseUrl = () => {
    return baseUrl;
};
