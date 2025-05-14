// import type { RequestHandler } from '@sveltejs/kit';
// import { json } from '@sveltejs/kit';
// import prisma from '$lib/prisma';

// export const POST: RequestHandler = async ({ request }) => {
//     try {
//         const body = await request.json();
//         const { title, description, slug, content, published, categoryIds } = body;

//         // 필수값 체크
//         if (
//             !title ||
//             !description ||
//             !slug ||
//             !content ||
//             !Array.isArray(categoryIds) ||
//             categoryIds.length === 0
//         ) {
//             return json({ error: '필수 입력값이 누락되었습니다.' }, { status: 400 });
//         }

//         // authorId는 임시로 1 (실제 서비스에서는 인증에서 추출)
//         const post = await prisma.post.create({
//             data: {
//                 title,
//                 description,
//                 slug,
//                 content,
//                 published: published ?? true,
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//                 authorId: 1,
//                 categories: {
//                     connect: categoryIds.map((id: number) => ({ id }))
//                 }
//             },
//             include: { categories: true }
//         });

//         return json(post, { status: 201 });
//     } catch (err) {
//         console.error(err);
//         return json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
//     }
// };
