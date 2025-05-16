export enum Route {
    Home = '/',
    Write = '/write',
    About = '/about',
    Contact = '/contact'
}

export interface Config {
    title: string;
    nickname: string;
    description: string;
}

export const config: Config = {
    title: 'Lilamaris',
    nickname: 'Lilamaris',
    description: '개발의 즐거움을 나눕니다.'
};
