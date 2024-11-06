import { cache } from '@typematter/cache';
import { describe, expect, it, vi } from 'vitest';

describe('cache', () => {
	const mock_fn = vi.fn(async (key: string) => key);

	it('returns a function', () => {
		const cached = cache(mock_fn);

		expect(typeof cached).toBe('function');
	});

	describe('cached function', () => {
		it('returns a value given a key', async () => {
			const cached = cache(mock_fn);

			const value = await cached('key');

			expect(vi.mocked(mock_fn)).toBeCalledTimes(1);
			expect(value).toBe('key');
		});

		it('caches a returned value', async () => {
			const cached = cache(mock_fn);

			await cached('key');
			await cached('key');

			expect(vi.mocked(mock_fn)).toBeCalledTimes(1);
		});

		it('caches a returned value for upto `ttl` microseconds', async () => {
			const cached = cache(mock_fn, { ttl: 100 });

			await cached('key');
			await cached('key');

			expect(vi.mocked(mock_fn)).toBeCalledTimes(1);

			await new Promise((resolve) => setTimeout(resolve, 200));

			await cached('key');
			await cached('key');

			expect(vi.mocked(mock_fn)).toBeCalledTimes(2);
		});

		it('caches a maximum number of values', async () => {
			const cached = cache(mock_fn, { maxSize: 2 });

			await cached('key1');
			await cached('key2');
			await cached('key3');

			expect(vi.mocked(mock_fn)).toBeCalledTimes(3);

			await cached('key2');
			await cached('key3');

			expect(vi.mocked(mock_fn)).toBeCalledTimes(3);

			await cached('key1');

			expect(vi.mocked(mock_fn)).toBeCalledTimes(4);
		});

		it('serializes keys using the provided function', async () => {
			const cached = cache(mock_fn, { serialize: (key) => key.toUpperCase() });

			await cached('key');

			expect(vi.mocked(mock_fn)).toBeCalledWith('KEY');
		});

		it('clears the cache', async () => {
			const cached = cache(mock_fn);

			await cached('key1');
			await cached('key2');

			expect(vi.mocked(mock_fn)).toBeCalledTimes(2);

			cached.clear();

			await cached('key1');
			await cached('key2');

			expect(vi.mocked(mock_fn)).toBeCalledTimes(4);
		});

		it('invalidates a key', async () => {
			const cached = cache(mock_fn);

			await cached('key1');
			await cached('key2');

			expect(vi.mocked(mock_fn)).toBeCalledTimes(2);

			cached.invalidate('key1');

			await cached('key1');
			await cached('key2');

			expect(vi.mocked(mock_fn)).toBeCalledTimes(3);
		});
	});
});
