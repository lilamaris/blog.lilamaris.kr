import { env } from '$env/dynamic/private';

const baseUrl =
    process.env.NODE_ENV === 'production' ? env.PROD_API_BASE_URL : env.DEV_API_BASE_URL;

export const getBaseUrl = () => {
    return baseUrl;
};
