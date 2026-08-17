function mapObject<K extends PropertyKey, V, T>(
  obj: Record<K, V>,
  transformer: (value: V, key: K) => T
): Record<K, T> {
  const result = {} as Record<K, T>;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = transformer(obj[key], key);
    }
  }

  return result;
}