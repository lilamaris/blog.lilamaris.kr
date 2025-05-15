<script lang="ts">
    import { formatDate } from '$lib/utils';
    import { ArrowUpRight, Github, Icon, type IconNode } from '@lucide/svelte';
    import type { PageData } from './$types';
    import PostSummarize from '$lib/components/fragment/PostSummarize.svelte';

    const XIcon: IconNode = [
        [
            'path',
            {
                d: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
                stroke: 'none',
                fill: 'currentColor'
            }
        ]
    ];

    export let data: PageData;
    const { recentPosts } = data;
</script>

<div class="mx-auto max-w-2xl">
    <section>
        <div class="flex items-center gap-2">
            <div class="avatar">
                <div class="rounded-box w-28">
                    <img src="/Lilamaris.svg" alt="프로필" />
                </div>
            </div>
            <div class="mt-4 flex flex-1 flex-col">
                <h1 class="text-fxl flex-1 font-bold">Lilamaris</h1>
                <p class="text-fmd">개발의 즐거움을 나눕니다.</p>
                <ul class="mt-2 flex gap-1">
                    <li>
                        <a
                            class="btn btn-sm btn-square tooltip tooltip-bottom"
                            href="https://github.com/lilamaris"
                            target="_blank"
                            data-tip="GitHub"
                        >
                            <Github class="h-4 w-4" />
                        </a>
                    </li>
                    <li>
                        <a
                            class="btn btn-sm btn-square tooltip tooltip-bottom"
                            href="https://x.com/_lilamaris"
                            target="_blank"
                            data-tip="X"
                        >
                            <Icon class="h-4 w-4" iconNode={XIcon} />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <section class="flex flex-col md:mt-12">
        <div class="mb-1 flex justify-between">
            <h2 class="text-fmd">최근 게시글</h2>
            <a
                href="/write"
                class="text-base-content hover:text-accent flex flex-row-reverse gap-1 transition-colors duration-150"
            >
                <ArrowUpRight class="h-4 w-4" />
                <small>더 보기</small>
            </a>
        </div>
        <PostSummarize posts={recentPosts} />
    </section>
</div>
