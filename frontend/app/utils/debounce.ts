export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout;

  const debouncedFunc = function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  } as T & { cancel: () => void };

  debouncedFunc.cancel = () => {
    clearTimeout(timeout);
  };

  return debouncedFunc;
}
