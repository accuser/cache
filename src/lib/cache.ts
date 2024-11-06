import type { CachedFn, CacheOptions } from '$types/cache.js';
import { SieveCache } from '@neophi/sieve-cache';

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
const cache = <T>(
	fn: (key: string) => Promise<T>,
	{ maxSize = 255, serialize, ttl }: CacheOptions = {}
): CachedFn<T> => {
	const entries = new SieveCache<string, { value: T; expires?: number }>(maxSize);
	const pending = new Map<string, Promise<T>>();

	const cachedFn: CachedFn<T> = async (naturalKey) => {
		const key = serialize ? serialize(naturalKey) : naturalKey;

		const entry = entries.get(key);

		if (entry !== undefined) {
			const { value, expires } = entry;

			if (expires === undefined || Date.now() < expires) {
				return value;
			} else {
				entries.delete(key);
			}
		}

		if (pending.has(key)) {
			return pending.get(key) as Promise<T>;
		}

		const promise = fn(key)
			.then((value) => {
				entries.set(key, {
					value,
					expires: ttl ? Date.now() + ttl : undefined
				});

				return value;
			})
			.catch((error) => {
				throw error;
			})
			.finally(() => {
				pending.delete(key);
			});

		pending.set(key, promise);

		return promise;
	};

	cachedFn.clear = (clearPending?: true) => {
		entries.clear();

		if (clearPending === true) {
			pending.clear();
		}
	};

	cachedFn.invalidate = (key: string) => {
		entries.delete(key);
	};

	return cachedFn;
};

export default cache;
