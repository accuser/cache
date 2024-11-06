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

export type { CacheOptions, CachedFn };
