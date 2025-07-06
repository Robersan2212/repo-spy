import axios, { AxiosResponse } from 'axios';
import { GitHubRepository, GitHubError, ApiResponse } from '../types';

/**
 * Service class for handling GitHub API communication
 * Demonstrates async/await patterns and proper error handling
 */
export class ApiService {
  private readonly baseUrl = 'https://api.github.com';
  private readonly headers: Record<string, string>;

  constructor(token?: string) {
    this.headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Repo-Spy-CLI'
    };

    // Add authentication if token is provided
    if (token) {
      this.headers['Authorization'] = `token ${token}`;
    }
  }

  /**
   * Fetches repository information from GitHub API
   * @param owner - Repository owner (username or organization)
   * @param repo - Repository name
   * @returns Promise with repository data or error
   */
  async getRepository(owner: string, repo: string): Promise<ApiResponse<GitHubRepository>> {
    try {
      const url = `${this.baseUrl}/repos/${owner}/${repo}`;
      
      console.log(`🔍 Fetching repository data for ${owner}/${repo}...`);
      
      const response: AxiosResponse<GitHubRepository> = await axios.get(url, {
        headers: this.headers,
        timeout: 10000 // 10 second timeout
      });

      return {
        success: true,
        data: response.data
      };

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const errorData = error.response?.data as GitHubError;

        let errorMessage = 'Failed to fetch repository data';

        switch (status) {
          case 404:
            errorMessage = `Repository '${owner}/${repo}' not found. Please check the repository name and owner.`;
            break;
          case 403:
            errorMessage = 'Rate limit exceeded. Consider using a GitHub token for higher limits.';
            break;
          case 401:
            errorMessage = 'Unauthorized. Please check your GitHub token if using one.';
            break;
          default:
            errorMessage = errorData?.message || error.message || errorMessage;
        }

        return {
          success: false,
          error: errorMessage
        };
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  }

  /**
   * Validates if a repository exists and is accessible
   * @param owner - Repository owner
   * @param repo - Repository name
   * @returns Promise with validation result
   */
  async validateRepository(owner: string, repo: string): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/repos/${owner}/${repo}`;
      await axios.head(url, { headers: this.headers });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the current rate limit status
   * @returns Promise with rate limit information
   */
  async getRateLimit(): Promise<ApiResponse<any>> {
    try {
      const url = `${this.baseUrl}/rate_limit`;
      const response = await axios.get(url, { headers: this.headers });
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch rate limit information'
      };
    }
  }
} 