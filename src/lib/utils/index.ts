export const formatDate = (date: Date, locales = 'ko-KR') => {
    const dateFormatter = new Intl.DateTimeFormat(locales);
    return dateFormatter.format(date);
};
