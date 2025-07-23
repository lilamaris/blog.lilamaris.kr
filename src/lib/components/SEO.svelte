<script lang="ts">
    import { seoContext } from '$lib/config/general';
    import { page } from '$app/state';

    const { title, description } = $props();

    const url = $derived(`${seoContext.baseUrl}${page.url.pathname}`);
</script>

<svelte:head>
    <title>{title} | Lilamaris Blog</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={seoContext.logoUrl} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Lilamaris Blog" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={seoContext.logoUrl} />
    <meta name="twitter:url" content={url} />

    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Website",
            "name": `${title} | Lilamaris Blog`,
            "url": `${url}`,
            "logo": ${seoContext.logoUrl}
        }
    </script>
</svelte:head>
