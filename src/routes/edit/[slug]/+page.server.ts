// check slug is exists then return article
import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const categories = await prisma.category.findMany();
    const slug = params.slug;

    if (!slug) return { article: null, categories };

    const article = await prisma.post.findFirst({
        where: { slug },
        include: { categories: true }
    });

    const categoryIds = article?.categories.map((category) => category.id);
    const articleWithCategoryIds = {
        ...article,
        categories: categoryIds
    };

    return { article: articleWithCategoryIds, categories };
};

export const actions: Actions = {
    saveArticle: async ({ request }) => {
        const formData = await request.formData();
        const id = Number(formData.get('id'));
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

        if (Object.keys(errors).length > 0) {
            const errorData = {
                data: Object.fromEntries(formData),
                errors
            };
            return fail(400, errorData);
        }

        const existing = await prisma.post.findFirst({ where: { id } });

        if (!existing) {
            // 새 글 생성
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
        } else {
            // 기존 글 수정
            await prisma.post.update({
                where: { id: existing.id },
                data: {
                    title,
                    description,
                    content,
                    published: published ? true : false,
                    updatedAt: new Date(),
                    categories: {
                        set: categories.map((id: number) => ({ id }))
                    }
                },
                include: { categories: true }
            });
        }

        redirect(303, '/');
    }
} satisfies Actions;
