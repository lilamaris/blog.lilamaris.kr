// check slug is exists then return article
import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const categories = await prisma.category.findMany();
    const slug = params.slug;

    if (!slug) return { article: null, categories };

    const article = await prisma.post.findFirst({
        where: {
            slug: slug
        }
    });

    return {
        article,
        categories
    };
};

export const actions: Actions = {
    saveArticle: async ({ request }) => {
        const formData = await request.formData();
        const title = String(formData.get('title'));
        const description = String(formData.get('description'));
        const slug = String(formData.get('slug'));
        const content = String(formData.get('content'));
        const published = String(formData.get('published'));
        const categories = formData
            .getAll('categories')
            .map((id: FormDataEntryValue) => Number(id));

        const errors: Record<string, unknown> = {};

        if (!title) errors.title = 'required';
        if (!description) errors.description = 'required';
        if (!content) errors.content = 'required';
        if (categories.length === 0) errors.categories = 'required';

        // slug 중복 검사
        const existing = await prisma.post.findFirst({ where: { slug } });
        if (existing) errors.slug = 'duplicated';

        if (Object.keys(errors).length > 0) {
            const errorData = {
                data: Object.fromEntries(formData),
                errors
            };
            return fail(400, errorData);
        }

        await prisma.post.create({
            data: {
                title,
                description,
                slug,
                content,
                published: published ? true : false,
                createdAt: new Date(),
                updatedAt: new Date(),
                authorId: 1,
                categories: {
                    connect: categories.map((id: number) => ({ id }))
                }
            },
            include: { categories: true }
        });

        redirect(303, '/');
    }
} satisfies Actions;
