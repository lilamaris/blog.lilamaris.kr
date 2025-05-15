import type { Action } from 'svelte/action';
import type { Writable } from 'svelte/store';

export const scrollTracker: Action<HTMLElement, Writable<boolean>> = (node, store) => {
    const onScroll = () => {
        store.set(window.scrollY > 0);
    };

    window.addEventListener('scroll', onScroll);

    onScroll();

    return {
        destroy: () => {
            window.removeEventListener('scroll', onScroll);
        }
    };
};
