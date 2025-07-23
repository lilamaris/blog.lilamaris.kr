import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
    const keyword = url.searchParams.get('keyword');
};
