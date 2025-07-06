#!/usr/bin/env node

import { Command } from 'commander';
import { ApiService } from './services/ApiService';
import { DataProcessor } from './services/DataProcessor';
import { CLIView } from './ui/CLIView';

/**
 * Main application class that orchestrates the Repo-Spy CLI
 * Demonstrates the integration of all modular components
 */
class RepoSpyApp {
  private apiService: ApiService;

  constructor(token?: string) {
    this.apiService = new ApiService(token);
  }

  /**
   * Main method to run the application
   * @param owner - Repository owner
   * @param repo - Repository name
   */
  async run(owner: string, repo: string): Promise<void> {
    try {
      CLIView.showWelcome();

      // Fetch repository data
      const response = await this.apiService.getRepository(owner, repo);

      if (!response.success || !response.data) {
        CLIView.displayError(response.error || 'Failed to fetch repository data');
        process.exit(1);
      }

      // Process the data
      const stats = DataProcessor.processRepositoryData(response.data);

      // Display the results
      CLIView.displayRepositoryStats(stats);

      // Show rate limit information
      const rateLimitResponse = await this.apiService.getRateLimit();
      if (rateLimitResponse.success && rateLimitResponse.data) {
        CLIView.displayRateLimit(rateLimitResponse.data);
      }

      CLIView.displaySuccess('Repository analysis completed successfully!');

    } catch (error) {
      CLIView.displayError(error instanceof Error ? error.message : 'An unexpected error occurred');
      process.exit(1);
    }
  }

  /**
   * Validates repository input format
   * @param input - Repository input string
   * @returns Object with owner and repo, or null if invalid
   */
  static parseRepositoryInput(input: string): { owner: string; repo: string } | null {
    const parts = input.split('/');
    
    if (parts.length === 2 && parts[0] && parts[1]) {
      return {
        owner: parts[0].trim(),
        repo: parts[1].trim()
      };
    }
    
    return null;
  }
}

/**
 * CLI setup and execution
 */
async function main(): Promise<void> {
  const program = new Command();

  program
    .name('repo-spy')
    .description('Fetch GitHub repository statistics from the command line')
    .version('1.0.0')
    .option('-t, --token <token>', 'GitHub personal access token')
    .argument('<repository>', 'Repository in format owner/repo')
    .action(async (repository: string, options: { token?: string }) => {
      // Parse repository input
      const parsed = RepoSpyApp.parseRepositoryInput(repository);
      if (!parsed) {
        CLIView.displayError('Invalid repository format. Use: owner/repo (e.g., facebook/react)');
        process.exit(1);
      }

      const targetOwner = parsed.owner;
      const targetRepo = parsed.repo;

      // Get token from options or environment
      const token = options.token || process.env.GITHUB_TOKEN;

      // Create and run the application
      const app = new RepoSpyApp(token);
      await app.run(targetOwner, targetRepo);
    });

  // Handle help command
  program.on('--help', () => {
    CLIView.displayHelp();
  });

  // Parse command line arguments
  program.parse();
}

// Run the application if this file is executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { RepoSpyApp }; 