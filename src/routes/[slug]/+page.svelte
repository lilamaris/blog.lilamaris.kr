<script lang="ts">
    const { data } = $props();
    const post = data.post;
</script>

{#if post}
    <div class="container mx-auto px-4 py-8">
        <div class="card card-bordered bg-base-100 mx-auto max-w-2xl shadow">
            <figure>
                <img
                    src="https://picsum.photos/600/300?random={post.id}"
                    alt="썸네일"
                    class="h-64 w-full object-cover"
                />
            </figure>
            <div class="card-body">
                <h1 class="card-title mb-2 text-2xl">{post.title}</h1>
                <p class="text-base-content/80 mb-4">{post.description}</p>
                <div class="mb-4 flex flex-wrap gap-2">
                    {#each post.categories as category}
                        <span class="badge badge-primary">{category.name}</span>
                    {/each}
                </div>
                <div class="prose mb-6 max-w-none">{@html data.html}</div>
                <div class="card-actions text-base-content/60 justify-between text-xs">
                    <span>by {post.author?.name ?? '익명'}</span>
                    <span>{String(post.createdAt).slice(0, 10)}</span>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="hero bg-base-200 min-h-[60vh]">
        <div class="hero-content text-center">
            <div>
                <h1 class="mb-4 text-3xl font-bold">포스트를 찾을 수 없습니다.</h1>
                <a href="/" class="btn btn-primary">홈으로 돌아가기</a>
            </div>
        </div>
    </div>
{/if}
