<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ChangeEventHandler } from 'svelte/elements';
    export type InputType = 'text' | 'textarea' | 'select' | 'toggle';
    interface Option {
        label: string;
        value: any;
    }
    interface Props {
        label: string;
        name: string;
        value: any;
        type: InputType;
        placeholder?: string;
        onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
        leftFragment?: Snippet;
        rightFragment?: Snippet;
        options?: Option[]; // select용
        multiple?: boolean; // select용
        checked?: boolean; // toggle용
        disabled?: boolean;
    }

    let {
        label,
        name,
        value,
        type,
        placeholder = '',
        onChange,
        leftFragment,
        rightFragment,
        options = [],
        multiple = false,
        checked = false,
        disabled = false,
        ...restProps
    }: Props = $props();
</script>

<label class="form-control w-full">
    <span class="label-text mb-1">{label}</span>
    {#if type === 'textarea'}
        <textarea
            class="textarea textarea-bordered w-full"
            {name}
            bind:value
            {placeholder}
            on:input={onChange}
            {disabled}
            {...restProps}
        ></textarea>
    {:else if type === 'select'}
        {#if multiple}
            <select
                class="select select-bordered w-full"
                {name}
                bind:value
                multiple
                on:change={onChange}
                {disabled}
                {...restProps}
            >
                {#each options as opt}
                    <option value={opt.value}>{opt.label}</option>
                {/each}
            </select>
        {:else}
            <select
                class="select select-bordered w-full"
                {name}
                bind:value
                on:change={onChange}
                {disabled}
                {...restProps}
            >
                {#each options as opt}
                    <option value={opt.value}>{opt.label}</option>
                {/each}
            </select>
        {/if}
    {:else if type === 'toggle'}
        <input
            type="checkbox"
            class="toggle toggle-primary"
            {name}
            {checked}
            on:change={onChange}
            {disabled}
            {...restProps}
        />
    {:else}
        <input
            class="input input-bordered w-full"
            {type}
            {name}
            bind:value
            {placeholder}
            on:input={onChange}
            {disabled}
            {...restProps}
        />
    {/if}
</label>
