import { Test, TestingModule } from '@nestjs/testing';
import { AutocompleteService } from './autocomplete.service';
import { mockTedTalkData, expectedSuggestions } from './autocompleteMocks';
import { MockLogger } from './autocompleteMocks';
import { Logger } from '@nestjs/common';

describe('AutocompleteService', () => {
  let service: AutocompleteService;
  let readFileSyncMock: jest.Mock;

  beforeEach(async () => {
    readFileSyncMock = jest.fn().mockReturnValue(mockTedTalkData);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutocompleteService,
        { provide: 'DATA_PATH', useValue: 'mock/path/to/data.csv' },
        { provide: 'READ_FILE_SYNC', useValue: readFileSyncMock },
        { provide: Logger, useClass: MockLogger },
      ],
    }).compile();

    service = module.get<AutocompleteService>(AutocompleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('loadData', () => {
    it('should handle file not found error gracefully', () => {
      readFileSyncMock.mockImplementationOnce(() => {
        throw new Error("ENOENT: no such file or directory, open 'data.csv'");
      });

      expect(() => service['loadData']()).toThrow(
        'The data file could not be found.',
      );
    });

    it('should handle permission denied error gracefully', () => {
      readFileSyncMock.mockImplementationOnce(() => {
        throw new Error("EACCES: permission denied, open 'data.csv'");
      });

      expect(() => service['loadData']()).toThrow(
        'Permission denied when accessing the data file.',
      );
    });

    it('should handle generic read error gracefully', () => {
      readFileSyncMock.mockImplementationOnce(() => {
        throw new Error('Error reading file');
      });

      expect(() => service['loadData']()).toThrow(
        'An error occurred while reading the data file.',
      );
    });

    it('should load data without errors', () => {
      service['loadData']();
      expect(service['tedTalks'].length).toBeGreaterThan(0);
    });
  });

  describe('findSuggestions', () => {
    beforeEach(() => {
      service['loadData']();
    });

    it('should return suggestions based on the query with default limit', () => {
      const suggestions = service.findSuggestions('test');
      expect(suggestions.length).toBeLessThanOrEqual(10);
    });

    it('should return suggestions based on the query with custom limit', () => {
      const suggestions = service.findSuggestions('test', 2);
      expect(suggestions).toEqual(expectedSuggestions);
    });
  });
});
