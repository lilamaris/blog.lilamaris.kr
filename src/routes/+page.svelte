<script lang="ts">
    import type { PageData } from './$types';
    import AvatarIntroduce from '$src/lib/components/layout/Home/AvatarIntroduce.svelte';
    import RecentPostList from '$src/lib/components/layout/Home/RecentPostList.svelte';

    export let data: PageData;
    const { recentPosts } = data;
</script>

<div class="flex flex-col">
    <AvatarIntroduce />
    <div class="divider text-fsm text-base-content/60">최근 게시글</div>
    <RecentPostList {recentPosts} />
</div>
