/**
 * Options for configuring the cache.
 */
interface CacheOptions {
    /**
     * A function to serialize the natural key into a string.
     *
     * @param naturalKey - The natural key to be serialized.
     * @returns The serialized key as a string.
     */
    serialize?: (naturalKey: string) => string;
    /**
     * The maximum size of the cache. When the cache exceeds this size,
     * the least recently used items will be removed.
     */
    maxSize?: number;
    /**
     * The time-to-live (TTL) for cache entries, in milliseconds.
     * Entries older than this value will be considered stale and removed.
     */
    ttl?: number;
}
/**
 * Represents a cached function that retrieves a value of type `T` based on a key.
 *
 * @template T - The type of the value to be retrieved.
 */
interface CachedFn<T> {
    (key: string): Promise<T>;
    clear(clearPending?: true): void;
    invalidate(key: string): void;
}

/**
 * Creates a cached version of the provided asynchronous function.
 *
 * @template T - The type of the value returned by the function.
 * @param {function(string): Promise<T>} fn - The asynchronous function to be cached.
 * @param {Object} [options] - Optional configuration for the cache.
 * @param {number} [options.maxSize=255] - The maximum number of entries in the cache.
 * @param {function(string): string} [options.serialize] - A function to serialize the cache keys.
 * @param {number} [options.ttl] - Time-to-live for cache entries in milliseconds.
 * @returns {CachedFn<T>} - The cached version of the provided function.
 */
declare const cache: <T>(fn: (key: string) => Promise<T>, { maxSize, serialize, ttl }?: CacheOptions) => CachedFn<T>;

export { cache };
