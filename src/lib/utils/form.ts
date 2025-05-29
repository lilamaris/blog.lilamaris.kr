export const formatDate = (date: Date | string, locales = 'ko-KR') => {
    const d = new Date(date);
    return d.toLocaleString(locales);
};
