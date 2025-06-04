export const formatDate = (date: Date | string, locales = 'ko-KR') => {
    const d = new Date(date);
    return d
        .toLocaleDateString(locales, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
        .replace(/\./g, '.');
};
