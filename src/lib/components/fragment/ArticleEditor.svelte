<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { BookText } from '@lucide/svelte';
    import { articleStore, type ArticleStoreValues } from '$lib/stores/article';
    import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';

    const { title, slug, description, content, categories, published } = articleStore;

    interface Props {
        avaliableCategories: { id: number; name: string }[];
    }

    const { avaliableCategories }: Props = $props();

    let editor: Monaco.editor.IStandaloneCodeEditor;
    let monaco: typeof Monaco;
    let editorContainer: HTMLElement;

    onMount(async () => {
        monaco = (await import('$lib/monaco')).default;
        editor = monaco.editor.create(editorContainer, {
            theme: 'vs-dark',
            automaticLayout: true
        });
        const model = monaco.editor.createModel('', 'markdown');
        editor.setModel(model);
        editor.setValue($content);

        editor.onDidChangeModelContent((e) => {
            $content = editor.getValue();
        });
    });

    onDestroy(() => {
        monaco?.editor.getModels().forEach((model) => model.dispose());
        editor?.dispose();
    });
</script>

<div class="flex gap-2">
    <label class="input flex-1">
        <BookText class="h-4 w-4" />
        <input
            type="text"
            name="title"
            class="grow"
            placeholder="제목을 입력해주세요."
            bind:value={$title}
        />
    </label>

    <label class="input flex-1">
        <BookText class="h-4 w-4" />
        <input
            type="text"
            name="slug"
            class="grow"
            placeholder="슬러그는 이렇게 표시됩니다."
            bind:value={$slug}
            readonly
        />
    </label>
</div>

<div class="flex gap-2">
    <label class="label select-none">
        <input
            type="checkbox"
            name="published"
            class="checkbox checkbox-sm"
            bind:checked={$published}
        />
        <span> 공개 </span>
    </label>
    <label class="input flex-1">
        <BookText class="h-4 w-4" />
        <input
            type="text"
            name="description"
            class="grow"
            placeholder="설명을 입력해주세요."
            bind:value={$description}
        />
    </label>
</div>
<fieldset class="fieldset bg-base-100 border-base-300 rounded-box flex flex-wrap border p-4">
    <legend class="fieldset-legend">카테고리</legend>
    {#each avaliableCategories as category}
        <label class="label select-none">
            <input
                type="checkbox"
                name="categories"
                class="checkbox checkbox-sm"
                value={category.id}
                bind:group={$categories}
            />
            <span>{category.name}</span>
        </label>
    {/each}
</fieldset>
<div class="flex-1" bind:this={editorContainer}></div>
<input type="hidden" name="content" bind:value={$content} />
