<script lang="ts">
    import { Github, type IconNode } from '@lucide/svelte';
    import IconButton from '$lib/components/fragment/IconButton.svelte';
    import IterableItem from '$lib/components/fragment/IterableItem.svelte';
    import { context } from '$lib/utils/context';

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

    const SNS = [
        {
            id: 0,
            name: 'GitHub',
            href: 'https://github.com/lilamaris',
            icon: Github
        },
        {
            id: 1,
            name: 'X',
            href: 'https://x.com/_lilamaris',
            icon: XIcon
        }
    ];
</script>

{#snippet SNSButtonSnippet(sns: (typeof SNS)[number])}
    <IconButton name={sns.name} href={sns.href} icon={sns.icon} />
{/snippet}

<div class="flex">
    <div class="avatar">
        <div class="rounded-box w-28">
            <img src="/Lilamaris.svg" alt="프로필" />
        </div>
    </div>
    <div class="flex-1 flex-col">
        <h1 class="text-flg font-bold">{context.nickname}</h1>
        <p class="text-fsm">{context.description}</p>
        <IterableItem
            parent="ul"
            class="mt-2 flex gap-1"
            items={SNS}
            itemSnippet={SNSButtonSnippet}
        />
    </div>
</div>
