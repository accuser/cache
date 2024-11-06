# Contributing to Pipeline

First off, thank you for considering contributing to Pipeline! It's people like you that make Pipeline such a great library.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct, which ensures a welcoming environment for all contributors.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps which reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed after following the steps
- Explain which behavior you expected to see instead and why
- Include any error messages or screenshots

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- A clear and descriptive title
- A detailed description of the proposed functionality
- Any possible drawbacks or limitations
- If possible, example code demonstrating the enhancement

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

#### Pull Request Process

1. Update the README.md with details of changes to the interface, if applicable
2. Update the types documentation if you're changing core functionalities
3. The PR title should be descriptive and follow conventional commit format
4. Include relevant issue numbers in the PR description
5. Ensure all tests pass and add new tests for new functionality

## Development Setup

1. Clone the repository:

```bash
git clone https://github.com/typematter/pipeline.git
cd pipeline
```

2. Install dependencies:

```bash
pnpm install
```

3. Run tests:

```bash
pnpm test
```

### Project Structure

```
pipeline/
├── src/       # Source files and unit test files
├── tests/     # Integration test files
```

## Coding Guidelines

### TypeScript Style Guide

- Use TypeScript for all new code
- Maintain strict type checking
- Follow existing code formatting patterns
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Testing

- Write unit tests for all new functionality
- Maintain or improve code coverage
- Test both success and failure cases
- Mock external dependencies appropriately

Example test structure:

```typescript
describe('PipelineStage', () => {
	it('should handle successful execution', async () => {
		// Test implementation
	});

	it('should handle errors appropriately', async () => {
		// Test implementation
	});
});
```

### Documentation

- Keep README.md up to date
- Document all new functions and types
- Include usage examples for new features
- Update API documentation when changing interfaces

## Release Process

1. Ensure all tests pass
2. Update version number according to [Semantic Versioning](https://semver.org/)
3. Update CHANGELOG.md
4. Create a new release tag
5. Push to main branch

## Getting Help

If you need help, you can:

- Open an issue with the question tag
- Review existing documentation
- Check closed issues for similar problems

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

Thank you for contributing to Pipeline! 🚀
