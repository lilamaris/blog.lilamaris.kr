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

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
