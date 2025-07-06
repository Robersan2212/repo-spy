import { GitHubRepository, RepositoryStats } from '../types';

/**
 * Service class for processing and transforming GitHub API data
 * Demonstrates data transformation and business logic separation
 */
export class DataProcessor {
  /**
   * Transforms raw GitHub API response into application-specific format
   * @param repo - Raw repository data from GitHub API
   * @returns Processed repository statistics
   */
  static processRepositoryData(repo: GitHubRepository): RepositoryStats {
    return {
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || 'No description available',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
      language: repo.language || 'Not specified',
      url: repo.html_url,
      lastUpdated: this.formatDate(repo.updated_at),
      size: this.formatSize(repo.size),
      defaultBranch: repo.default_branch,
      owner: {
        username: repo.owner.login,
        avatarUrl: repo.owner.avatar_url,
        profileUrl: repo.owner.html_url
      }
    };
  }

  /**
   * Formats a date string into a human-readable format
   * @param dateString - ISO date string
   * @returns Formatted date string
   */
  private static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Formats repository size from KB to human-readable format
   * @param sizeInKB - Size in kilobytes
   * @returns Formatted size string
   */
  private static formatSize(sizeInKB: number): number {
    // GitHub API returns size in KB, we'll keep it simple and return as-is
    // Could be enhanced to show MB/GB for larger repositories
    return sizeInKB;
  }

  /**
   * Calculates repository health score based on various metrics
   * @param stats - Repository statistics
   * @returns Health score (0-100)
   */
  static calculateHealthScore(stats: RepositoryStats): number {
    let score = 0;

    // Base score for having a repository
    score += 20;

    // Bonus for having a description
    if (stats.description !== 'No description available') {
      score += 10;
    }

    // Bonus for having a specified language
    if (stats.language !== 'Not specified') {
      score += 10;
    }

    // Bonus for stars (capped at 20 points)
    score += Math.min(stats.stars, 1000) / 50;

    // Bonus for forks (capped at 15 points)
    score += Math.min(stats.forks, 500) / 33.33;

    // Penalty for too many open issues (indicates maintenance issues)
    if (stats.openIssues > 100) {
      score -= 10;
    } else if (stats.openIssues > 50) {
      score -= 5;
    }

    // Bonus for recent updates (within last 30 days)
    const lastUpdate = new Date(stats.lastUpdated);
    const daysSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 30) {
      score += 15;
    } else if (daysSinceUpdate < 90) {
      score += 10;
    } else if (daysSinceUpdate < 365) {
      score += 5;
    }

    return Math.min(Math.max(Math.round(score), 0), 100);
  }

  /**
   * Gets a health status based on the health score
   * @param score - Health score (0-100)
   * @returns Health status string
   */
  static getHealthStatus(score: number): string {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    if (score >= 20) return 'Poor';
    return 'Critical';
  }
} 