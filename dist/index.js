import { SieveCache } from '@neophi/sieve-cache';

// src/lib/cache.ts
var cache = (fn, { maxSize = 255, serialize, ttl } = {}) => {
  const entries = new SieveCache(maxSize);
  const pending = /* @__PURE__ */ new Map();
  const cachedFn = async (naturalKey) => {
    const key = serialize ? serialize(naturalKey) : naturalKey;
    const entry = entries.get(key);
    if (entry !== void 0) {
      const { value, expires } = entry;
      if (expires === void 0 || Date.now() < expires) {
        return value;
      } else {
        entries.delete(key);
      }
    }
    if (pending.has(key)) {
      return pending.get(key);
    }
    const promise = fn(key).then((value) => {
      entries.set(key, {
        value,
        expires: ttl ? Date.now() + ttl : void 0
      });
      return value;
    }).catch((error) => {
      throw error;
    }).finally(() => {
      pending.delete(key);
    });
    pending.set(key, promise);
    return promise;
  };
  cachedFn.clear = (clearPending) => {
    entries.clear();
    if (clearPending === true) {
      pending.clear();
    }
  };
  cachedFn.invalidate = (key) => {
    entries.delete(key);
  };
  return cachedFn;
};
var cache_default = cache;

export { cache_default as cache };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map