export function toSorted<T>(arr: T[], cmp?: (a: T, b: T) => number): T[] {
  return [...arr].sort(cmp);
}

export function mapGroupBy<K, T>(
  arr: Array<T>,
  pred: (v: T, i: number) => K,
): Map<K, T[]> {
  return arr.reduce((map, cur, idx) => {
    const key = pred(cur, idx);
    map.set(key, [...(map.get(key) ?? []), cur]);
    return map;
  }, new Map<K, T[]>());
}

export function objectGroupBy<K extends PropertyKey, T>(
  arr: Array<T>,
  pred: (v: T, i: number) => K,
): Partial<Record<K, T[]>> {
  return arr.reduce(
    (obj, cur, idx) => {
      const key = pred(cur, idx);
      obj[key] = [...(obj[key] ?? []), cur];
      return obj;
    },
    {} as Partial<Record<K, T[]>>,
  );
}
