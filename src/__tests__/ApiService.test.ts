import { ApiService } from '../services/ApiService';

describe('ApiService', () => {
  let apiService: ApiService;

  beforeEach(() => {
    apiService = new ApiService();
  });

  describe('getRepository', () => {
    it('should fetch repository data successfully', async () => {
      // This is an integration test that requires internet connection
      // In a real project, you'd mock the axios calls
      const response = await apiService.getRepository('facebook', 'react');
      
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      if (response.data) {
        expect(response.data.name).toBe('react');
        expect(response.data.full_name).toBe('facebook/react');
      }
    });

    it('should handle non-existent repository', async () => {
      const response = await apiService.getRepository('nonexistent', 'repo');
      
      expect(response.success).toBe(false);
      expect(response.error).toContain('not found');
    });
  });

  describe('validateRepository', () => {
    it('should return true for existing repository', async () => {
      const isValid = await apiService.validateRepository('facebook', 'react');
      expect(isValid).toBe(true);
    });

    it('should return false for non-existing repository', async () => {
      const isValid = await apiService.validateRepository('nonexistent', 'repo');
      expect(isValid).toBe(false);
    });
  });
}); 