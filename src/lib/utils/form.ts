// export const formatDate = (date: Date, locales = 'ko-KR') => {
//     const dateFormatter = new Intl.DateTimeFormat(locales);
//     return dateFormatter.format(date);
// };

export const formatDate = (date: Date | string, locales = 'ko-KR') => {
    const d = new Date(date);
    return d.toLocaleString(locales);
};
