<script lang="ts">
    import { formatDate } from '$lib/utils';

    const { data } = $props();
    const articles = data.articles;
</script>

<div class="mx-auto mt-24 flex max-w-2xl flex-col gap-2 px-2">
    <ul class="list">
        {#each articles as article, i}
            <li>
                <a
                    class="list-row hover:bg-base-300 transition-colors duration-150"
                    href="/{article.slug}"
                >
                    <div class="text-4xl font-thin tabular-nums opacity-30 select-none">
                        {i + 1}
                    </div>
                    <div>
                        <h1>{article.title}</h1>
                        <small class="list-col-wrap text-fsm text-base-content/60">
                            {article.description}
                        </small>
                        <div class="mt-1 flex flex-wrap gap-1">
                            {#each article.categories as category}
                                <span class="badge badge-sm shadow">{category.name}</span>
                            {/each}
                        </div>
                    </div>
                    <small class="text-base-content/40">
                        {formatDate(article.createdAt)}
                    </small>
                </a>
                <!-- <a href="/{article.slug}" class="card card-bordered">
                <div class="card-body">
                    <h2 class="card-title truncate">{article.title}</h2>
                    <div class="mb-2 flex flex-wrap gap-2">
                        {#each article.categories as category}
                            <span class="badge badge-primary">{category.name}</span>
                        {/each}
                    </div>
                    <div class="card-actions text-base-content/60 justify-between text-xs">
                        <span>by {article.author?.name ?? '익명'}</span>
                        <span>{String(article.createdAt).slice(0, 10)}</span>
                    </div>
                </div>
            </a> -->
            </li>
        {/each}
    </ul>
</div>
