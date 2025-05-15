export enum Route {
    Home = '/',
    Write = '/write',
    About = '/about',
    Contact = '/contact'
}

export interface Config {
    title: string;
    description: string;
}

export const config: Config = {
    title: 'Lilamaris',
    description: 'Lilamaris is a platform for creating and sharing content.'
};
