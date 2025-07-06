/**
 * TypeScript interfaces for GitHub API responses and application data
 */

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  size: number;
  default_branch: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
}

export interface RepositoryStats {
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  language: string;
  url: string;
  lastUpdated: string;
  size: number;
  defaultBranch: string;
  owner: {
    username: string;
    avatarUrl: string;
    profileUrl: string;
  };
}

export interface GitHubError {
  message: string;
  documentation_url?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 