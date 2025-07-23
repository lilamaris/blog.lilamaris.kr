<script lang="ts">
    import { Github, type IconNode } from '@lucide/svelte';
    import IconButton from './IconButton.svelte';
    import IterableItem from './IterableItem.svelte';

    import { context } from '$lib/config';

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
        <div class="rounded-box h-24">
            <img src="/Lilamaris.svg" alt="프로필" />
        </div>
    </div>
    <div class="flex flex-col gap-4">
        <div>
            <h1 class="text-2xl font-bold">{context.nickname}</h1>
            <p class="text-sm">{context.description}</p>
        </div>

        <IterableItem
            parent="ul"
            class="flex gap-1"
            items={SNS}
            itemIdentifier="id"
            itemSnippet={SNSButtonSnippet}
        />
    </div>
</div>
