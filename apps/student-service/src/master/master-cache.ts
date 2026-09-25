const hits = new Map<string, { at: number; value: unknown }>();
const pending = new Map<string, Promise<unknown>>();
const TTL_MS = 60_000;

export function readMasterCache<T>(key: string, load: () => Promise<T>): Promise<T> {
  const row = hits.get(key);
  if (row && Date.now() - row.at < TTL_MS) return Promise.resolve(row.value as T);
  const inflight = pending.get(key);
  if (inflight) return inflight as Promise<T>;
  const promise = load()
    .then((value) => {
      hits.set(key, { at: Date.now(), value });
      pending.delete(key);
      return value;
    })
    .catch((error) => {
      pending.delete(key);
      throw error;
    });
  pending.set(key, promise);
  return promise;
}

export function clearMasterCache(prefix: string) {
  for (const key of [...hits.keys(), ...pending.keys()]) {
    if (key.startsWith(prefix)) {
      hits.delete(key);
      pending.delete(key);
    }
  }
}
