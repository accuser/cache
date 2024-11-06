# Cache

[![Node.js Package](https://github.com/typematter/cache/actions/workflows/release-package.yml/badge.svg)](https://github.com/typematter/cache/actions/workflows/release-package.yml)

A simple [SIEVE](https://cachemon.github.io/SIEVE-website/)-based cache for keyed functions.

## Table of contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Asynchronous Support**: Cache results of asynchronous functions.
- **TTL (Time-to-Live)**: Automatically invalidate stale cache entries.
- **Custom Key Serialization**: Support for custom key serialization.
- **Manual Invalidation**: Manually invalidate specific cache entries.
- **Clear Cache**: Clear all cache entries.

## Installation

To install the library, use `pnpm`:

```bash
pnpm install typematter/cache
```

NPM packages coming soon!

## Usage

```typescript
import cache from 'typematter/cache';

const fetchData = async (key: string): Promise<string> => {
	// Simulate an asynchronous operation
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(`Data for ${key}`);
		}, 1000);
	});
};

const cachedFetchData = cache(fetchData, { ttl: 60000 });

(async () => {
	const data = await cachedFetchData('exampleKey');
	console.log(data); // Outputs: Data for exampleKey
})();
```

## API Reference

### `cache(fn, options)`

Creates a cached version of the provided asynchronous function.

#### Parameters

- `fn` (function): The asynchronous function to be cached. It should accept a single string argument and return a Promise.
- `options` (CacheOptions): Optional configuration for the cache.
  - `maxSize` (number): The maximum number of entries in the cache. Defaults to 255.
  - `serialize` (function): A function to serialize the cache keys. It should accept a string and return a string.
  - `ttl` (number): Time-to-live for cache entries in milliseconds.

#### Returns

- `CachedFn<T>`: The cached version of the provided function.

### `CachedFn<T>`

Represents a cached function that retrieves a value of type `T` based on a key.

#### Methods

- `clear(clearPending?: true)`: Clears all cache entries. If `clearPending` is `true`, it also clears pending requests.
- `invalidate(key: string)`: Invalidates a specific cache entry by key.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to open an issue.
