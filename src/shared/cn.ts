/**
 * Объединяет CSS классы в одну строку.
 * Поддерживает строки, числа, массивы и объекты (ключи с truthy значениями).
 * Falsy значения игнорируются.
 *
 * @example
 * cn('btn', { active: true, disabled: false }) // 'btn active'
 */
const cn = (...args: unknown[]): string => {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (!arg) return;

    if (typeof arg === "string") {
      classes.push(arg);
      return;
    }

    if (typeof arg === "number") {
      classes.push(String(arg));
      return;
    }

    if (Array.isArray(arg)) {
      const nested = cn(...arg);
      if (nested) classes.push(nested);
      return;
    }

    if (typeof arg === "object") {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key as keyof typeof arg]) {
          classes.push(key);
        }
      }
    }
  });

  return classes.join(" ");
};

export default cn;
