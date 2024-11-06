import { describe, it, expect, vi } from 'vitest';
import cache from './cache.js';

describe('cache', () => {
	it('should return cached value if within TTL', async () => {
		const fn = vi.fn(async (key: string) => `value-${key}`);
		const cachedFn = cache(fn, { ttl: 1000 });

		const result1 = await cachedFn('key1');
		const result2 = await cachedFn('key1');

		expect(result1).toBe('value-key1');
		expect(result2).toBe('value-key1');
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('should call the function again if TTL has expired', async () => {
		const fn = vi.fn(async (key: string) => `value-${key}`);
		const cachedFn = cache(fn, { ttl: 10 });

		const result1 = await cachedFn('key1');
		await new Promise((resolve) => setTimeout(resolve, 20));
		const result2 = await cachedFn('key1');

		expect(result1).toBe('value-key1');
		expect(result2).toBe('value-key1');
		expect(fn).toHaveBeenCalledTimes(2);
	});

	it('should clear the cache', async () => {
		const fn = vi.fn(async (key: string) => `value-${key}`);
		const cachedFn = cache(fn);

		await cachedFn('key1');
		cachedFn.clear();
		await cachedFn('key1');

		expect(fn).toHaveBeenCalledTimes(2);
	});

	it('should invalidate a specific cache entry', async () => {
		const fn = vi.fn(async (key: string) => `value-${key}`);
		const cachedFn = cache(fn);

		await cachedFn('key1');
		cachedFn.invalidate('key1');
		await cachedFn('key1');

		expect(fn).toHaveBeenCalledTimes(2);
	});

	it('should handle pending promises correctly', async () => {
		const fn = vi.fn(async (key: string) => {
			await new Promise((resolve) => setTimeout(resolve, 50));
			return `value-${key}`;
		});
		const cachedFn = cache(fn);

		const promise1 = cachedFn('key1');
		const promise2 = cachedFn('key1');

		const result1 = await promise1;
		const result2 = await promise2;

		expect(result1).toBe('value-key1');
		expect(result2).toBe('value-key1');
		expect(fn).toHaveBeenCalledTimes(1);
	});
});
