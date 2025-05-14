import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async () => {
    try {
        const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
        return json(categories);
    } catch (err) {
        console.error(err);
        return json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const { name } = body;
        if (!name || typeof name !== 'string') {
            return json({ error: '카테고리 이름이 필요합니다.' }, { status: 400 });
        }
        // 중복 체크
        const exists = await prisma.category.findUnique({ where: { name } });
        if (exists) {
            return json({ error: '이미 존재하는 카테고리입니다.' }, { status: 409 });
        }
        const category = await prisma.category.create({ data: { name } });
        return json(category, { status: 201 });
    } catch (err) {
        console.error(err);
        return json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
};
