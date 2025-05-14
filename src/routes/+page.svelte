<script lang="ts">
    const { data } = $props();
    const articles = data.articles;
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="mb-8 text-3xl font-bold">블로그 글 목록</h1>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {#each articles as article}
            <a
                href="/{article.slug}"
                class="card card-bordered bg-base-100 shadow transition hover:shadow-lg"
            >
                <figure>
                    <img
                        src="https://picsum.photos/400/250?random={article.id}"
                        alt="썸네일"
                        class="h-48 w-full object-cover"
                        loading="lazy"
                    />
                </figure>
                <div class="card-body">
                    <h2 class="card-title truncate">{article.title}</h2>
                    <p class="mb-2">{article.description}</p>
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
            </a>
        {/each}
    </div>
</div>
