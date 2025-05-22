import { env } from '$env/dynamic/public';
import { dev } from '$app/environment';

export enum Route {
    Home = '/',
    Write = '/write',
    About = '/about',
    Contact = '/contact'
}

export interface Context {
    title: string;
    nickname: string;
    description: string;
    apiBaseUrl: string;
    assetBaseUrl: string;
}

export const context: Context = {
    title: 'Lilamaris',
    nickname: 'Lilamaris',
    description: '개발의 즐거움을 나눕니다.',
    apiBaseUrl: dev ? (env.PUBLIC_DEV_API_BASE ?? '') : (env.PUBLIC_PROD_API_BASE ?? ''),
    assetBaseUrl: dev ? (env.PUBLIC_DEV_ASSET_API_BASE ?? '') : (env.PUBLIC_PROD_ASSET_API_BASE ?? '')
};
