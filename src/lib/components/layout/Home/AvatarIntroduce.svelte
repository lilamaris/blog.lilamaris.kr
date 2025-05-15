<script lang="ts">
    import { Github, type IconNode } from '@lucide/svelte';
    import SNSButton from './SNSButton.svelte';

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
            name: 'GitHub',
            href: 'https://github.com/lilamaris',
            icon: Github
        },
        {
            name: 'X',
            href: 'https://x.com/_lilamaris',
            icon: XIcon
        }
    ];
</script>

<div class="flex">
    <div class="avatar">
        <div class="rounded-box w-28">
            <img src="/Lilamaris.svg" alt="프로필" />
        </div>
    </div>
    <div class="flex-1 flex-col">
        <h1 class="text-flg font-bold">Lilamaris</h1>
        <p class="text-fsm">개발의 즐거움을 나눕니다.</p>
        <ul class="mt-2 flex gap-1">
            {#each SNS as sns}
                <li>
                    <SNSButton name={sns.name} href={sns.href} icon={sns.icon} />
                </li>
            {/each}
        </ul>
    </div>
</div>
