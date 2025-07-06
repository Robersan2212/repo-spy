import { DataProcessor } from '../services/DataProcessor';
import { GitHubRepository } from '../types';

describe('DataProcessor', () => {
  const mockRepository: GitHubRepository = {
    id: 1,
    name: 'test-repo',
    full_name: 'test-owner/test-repo',
    description: 'A test repository',
    stargazers_count: 100,
    forks_count: 50,
    open_issues_count: 10,
    language: 'TypeScript',
    html_url: 'https://github.com/test-owner/test-repo',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-12-01T00:00:00Z',
    size: 1024,
    default_branch: 'main',
    owner: {
      login: 'test-owner',
      id: 1,
      avatar_url: 'https://github.com/test-owner.png',
      html_url: 'https://github.com/test-owner'
    }
  };

  describe('processRepositoryData', () => {
    it('should transform GitHub repository data correctly', () => {
      const result = DataProcessor.processRepositoryData(mockRepository);

      expect(result.name).toBe('test-repo');
      expect(result.fullName).toBe('test-owner/test-repo');
      expect(result.description).toBe('A test repository');
      expect(result.stars).toBe(100);
      expect(result.forks).toBe(50);
      expect(result.openIssues).toBe(10);
      expect(result.language).toBe('TypeScript');
      expect(result.url).toBe('https://github.com/test-owner/test-repo');
      expect(result.size).toBe(1024);
      expect(result.defaultBranch).toBe('main');
      expect(result.owner.username).toBe('test-owner');
    });

    it('should handle null description and language', () => {
      const repoWithNulls = {
        ...mockRepository,
        description: null,
        language: null
      };

      const result = DataProcessor.processRepositoryData(repoWithNulls);

      expect(result.description).toBe('No description available');
      expect(result.language).toBe('Not specified');
    });
  });

  describe('calculateHealthScore', () => {
    it('should calculate health score correctly', () => {
      const stats = DataProcessor.processRepositoryData(mockRepository);
      const score = DataProcessor.calculateHealthScore(stats);

      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it('should handle repository with no description', () => {
      const repoWithNoDesc = {
        ...mockRepository,
        description: null
      };
      const stats = DataProcessor.processRepositoryData(repoWithNoDesc);
      const score = DataProcessor.calculateHealthScore(stats);

      expect(score).toBeGreaterThan(0);
    });
  });

  describe('getHealthStatus', () => {
    it('should return correct status for different scores', () => {
      expect(DataProcessor.getHealthStatus(90)).toBe('Excellent');
      expect(DataProcessor.getHealthStatus(70)).toBe('Good');
      expect(DataProcessor.getHealthStatus(50)).toBe('Fair');
      expect(DataProcessor.getHealthStatus(30)).toBe('Poor');
      expect(DataProcessor.getHealthStatus(10)).toBe('Critical');
    });
  });
}); 