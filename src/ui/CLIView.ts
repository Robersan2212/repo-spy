import chalk from 'chalk';
import { RepositoryStats } from '../types';
import { DataProcessor } from '../services/DataProcessor';

/**
 * Service class for handling CLI output and formatting
 * Demonstrates user interface concerns and terminal formatting
 */
export class CLIView {
  /**
   * Displays a welcome message
   */
  static showWelcome(): void {
    console.log(chalk.blue.bold('\n🚀 Repo-Spy - GitHub Repository Statistics'));
    console.log(chalk.gray('Fetching repository data from GitHub...\n'));
  }

  /**
   * Displays repository statistics in a formatted table
   * @param stats - Repository statistics to display
   */
  static displayRepositoryStats(stats: RepositoryStats): void {
    const healthScore = DataProcessor.calculateHealthScore(stats);
    const healthStatus = DataProcessor.getHealthStatus(healthScore);

    console.log(chalk.cyan.bold('╔══════════════════════════════════════════════════════════════╗'));
    console.log(chalk.cyan.bold(`║                    ${stats.fullName}                    ║`));
    console.log(chalk.cyan.bold('╚══════════════════════════════════════════════════════════════╝\n'));

    // Basic Information
    console.log(chalk.white.bold('📋 Basic Information:'));
    console.log(`   ${chalk.gray('Description:')} ${stats.description}`);
    console.log(`   ${chalk.gray('Language:')} ${chalk.yellow(stats.language)}`);
    console.log(`   ${chalk.gray('Default Branch:')} ${chalk.green(stats.defaultBranch)}`);
    console.log(`   ${chalk.gray('Repository URL:')} ${chalk.blue.underline(stats.url)}\n`);

    // Statistics
    console.log(chalk.white.bold('📊 Statistics:'));
    console.log(`   ${chalk.gray('Stars:')} ${chalk.yellow.bold(stats.stars.toLocaleString())} ⭐`);
    console.log(`   ${chalk.gray('Forks:')} ${chalk.blue.bold(stats.forks.toLocaleString())} 🍴`);
    console.log(`   ${chalk.gray('Open Issues:')} ${chalk.red.bold(stats.openIssues.toLocaleString())} 🐛`);
    console.log(`   ${chalk.gray('Size:')} ${chalk.magenta.bold(stats.size.toLocaleString())} KB 📦\n`);

    // Owner Information
    console.log(chalk.white.bold('👤 Owner Information:'));
    console.log(`   ${chalk.gray('Username:')} ${chalk.cyan(stats.owner.username)}`);
    console.log(`   ${chalk.gray('Profile:')} ${chalk.blue.underline(stats.owner.profileUrl)}\n`);

    // Health Score
    console.log(chalk.white.bold('🏥 Repository Health:'));
    const healthColor = this.getHealthColor(healthScore);
    console.log(`   ${chalk.gray('Score:')} ${healthColor.bold(`${healthScore}/100`)}`);
    console.log(`   ${chalk.gray('Status:')} ${healthColor.bold(healthStatus)}\n`);

    // Last Updated
    console.log(chalk.white.bold('🕒 Activity:'));
    console.log(`   ${chalk.gray('Last Updated:')} ${chalk.green(stats.lastUpdated)}\n`);

    console.log(chalk.gray('─'.repeat(60)));
  }

  /**
   * Displays an error message
   * @param message - Error message to display
   */
  static displayError(message: string): void {
    console.log(chalk.red.bold('\n❌ Error:'));
    console.log(chalk.red(`   ${message}\n`));
  }

  /**
   * Displays a success message
   * @param message - Success message to display
   */
  static displaySuccess(message: string): void {
    console.log(chalk.green.bold(`\n✅ ${message}\n`));
  }

  /**
   * Displays help information
   */
  static displayHelp(): void {
    console.log(chalk.blue.bold('\n📖 Repo-Spy Help'));
    console.log(chalk.gray('Usage:'));
    console.log('   repo-spy <owner>/<repository>');
    console.log('   repo-spy <owner> <repository>');
    console.log('\nExamples:');
    console.log('   repo-spy facebook/react');
    console.log('   repo-spy facebook react');
    console.log('\nOptions:');
    console.log('   --token, -t    GitHub personal access token');
    console.log('   --help, -h     Show this help message');
    console.log('\nEnvironment Variables:');
    console.log('   GITHUB_TOKEN   GitHub personal access token\n');
  }

  /**
   * Displays rate limit information
   * @param rateLimit - Rate limit data from GitHub API
   */
  static displayRateLimit(rateLimit: any): void {
    const core = rateLimit.resources.core;
    const remaining = core.remaining;
    const limit = core.limit;
    const resetTime = new Date(core.reset * 1000);

    console.log(chalk.yellow.bold('\n⚠️  Rate Limit Information:'));
    console.log(`   ${chalk.gray('Remaining:')} ${chalk.yellow(remaining)}/${chalk.yellow(limit)}`);
    console.log(`   ${chalk.gray('Resets at:')} ${chalk.yellow(resetTime.toLocaleString())}\n`);
  }

  /**
   * Displays a loading spinner message
   * @param message - Loading message
   */
  static showLoading(message: string): void {
    console.log(chalk.blue(`⏳ ${message}`));
  }

  /**
   * Gets the appropriate color for health score display
   * @param score - Health score (0-100)
   * @returns Chalk color function
   */
  private static getHealthColor(score: number): chalk.Chalk {
    if (score >= 80) return chalk.green;
    if (score >= 60) return chalk.yellow;
    if (score >= 40) return chalk.magenta;
    if (score >= 20) return chalk.red;
    return chalk.red.bold;
  }
} 