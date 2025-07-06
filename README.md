# Repo-Spy 🚀

A command-line interface (CLI) application built with TypeScript and Node.js that fetches key statistics from public GitHub repositories via the GitHub REST API and displays a formatted summary in the terminal.

## Features

- 📊 **Repository Statistics**: Fetch stars, forks, open issues, and language information
- 🏥 **Health Scoring**: Intelligent repository health assessment based on multiple metrics
- 🎨 **Beautiful Output**: Colorful, formatted terminal output with emojis and tables
- 🔐 **Authentication Support**: Optional GitHub token for higher rate limits
- 📈 **Rate Limit Monitoring**: Real-time rate limit information display
- 🧪 **Comprehensive Testing**: Unit tests for all major components
- 📝 **TypeScript**: Full type safety and modern JavaScript features

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd repo-spy
```

2. Install dependencie:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. (Optional) Install globally:
```bash
npm link
```

## Usage

### Basic Usage

```bash
# Using owner/repo format
repo-spy facebook/react

# Using separate arguments
repo-spy facebook react
```

### With GitHub Token

```bash
# Using command line option
repo-spy facebook/react --token YOUR_GITHUB_TOKEN

# Using environment variable
export GITHUB_TOKEN=YOUR_GITHUB_TOKEN
repo-spy facebook/react
```

### Examples

```bash
# Popular repositories
repo-spy facebook/react
repo-spy microsoft/vscode
repo-spy vercel/next.js

# Your own repositories
repo-spy yourusername/your-repo
```

## Output Example

```
🚀 Repo-Spy - GitHub Repository Statistics
Fetching repository data from GitHub...

╔══════════════════════════════════════════════════════════════╗
║                    facebook/react                    ║
╚══════════════════════════════════════════════════════════════╝

📋 Basic Information:
   Description: The library for web and native user interfaces
   Language: JavaScript
   Default Branch: main
   Repository URL: https://github.com/facebook/react

📊 Statistics:
   Stars: 208,000 ⭐
   Forks: 43,000 🍴
   Open Issues: 1,200 🐛
   Size: 45,000 KB 📦

👤 Owner Information:
   Username: facebook
   Profile: https://github.com/facebook

🏥 Repository Health:
   Score: 95/100
   Status: Excellent

🕒 Activity:
   Last Updated: Dec 1, 2023, 2:30 PM

────────────────────────────────────────────────────────────

✅ Repository analysis completed successfully!

⚠️  Rate Limit Information:
   Remaining: 4990/5000
   Resets at: 12/1/2023, 3:00 PM
```

## Project Structure

```
repo-spy/
├── src/
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── services/
│   │   ├── ApiService.ts         # GitHub API communication
│   │   └── DataProcessor.ts      # Data transformation logic
│   ├── ui/
│   │   └── CLIView.ts           # Terminal output formatting
│   ├── __tests__/
│   │   ├── ApiService.test.ts    # API service tests
│   │   └── DataProcessor.test.ts # Data processor tests
│   └── index.ts                 # Main application entry point
├── dist/                        # Compiled JavaScript output
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Testing configuration
└── README.md                   # This file
```

## Architecture

The project follows a modular architecture with clear separation of concerns:

### 1. **ApiService** (`src/services/ApiService.ts`)
- Handles all GitHub API communication
- Implements proper error handling and rate limiting
- Supports authentication via GitHub tokens
- Demonstrates async/await patterns

### 2. **DataProcessor** (`src/services/DataProcessor.ts`)
- Transforms raw GitHub API data into application-specific formats
- Calculates repository health scores
- Implements business logic for data analysis
- Handles data formatting and validation

### 3. **CLIView** (`src/ui/CLIView.ts`)
- Manages all terminal output and formatting
- Uses chalk for colorful, user-friendly display
- Implements consistent UI patterns
- Handles error and success message display

### 4. **Types** (`src/types/index.ts`)
- Defines TypeScript interfaces for all data structures
- Ensures type safety throughout the application
- Documents API response formats

## Development

### Available Scripts

```bash
# Build the project
npm run build

# Run in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Clean build artifacts
npm run clean
```

### Testing

The project includes comprehensive unit tests:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Code Quality

The project uses ESLint for code quality:

```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

## API Rate Limits

GitHub's REST API has rate limits:
- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour

The application displays current rate limit information after each request. For higher limits, use a GitHub personal access token.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [GitHub REST API](https://docs.github.com/en/rest) for providing the data
- [Commander.js](https://github.com/tj/commander.js) for CLI argument parsing
- [Chalk](https://github.com/chalk/chalk) for terminal styling
- [Axios](https://axios-http.com/) for HTTP requests

## Educational Value

This project demonstrates:

- **TypeScript Best Practices**: Strong typing, interfaces, and modern JavaScript features
- **Async/Await Patterns**: Proper handling of asynchronous operations
- **API Integration**: Real-world third-party API consumption
- **Modular Architecture**: Separation of concerns and maintainable code structure
- **Error Handling**: Comprehensive error management and user feedback
- **Testing**: Unit testing with Jest and TypeScript
- **CLI Development**: Command-line interface design and user experience
- **Code Quality**: ESLint configuration and consistent coding standards