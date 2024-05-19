import { Test, TestingModule } from '@nestjs/testing';
import { AutocompleteService } from './autocomplete.service';
import { mockTedTalkData, expectedSuggestions } from './autocompleteMocks';

describe('AutocompleteService', () => {
  let service: AutocompleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutocompleteService,
        { provide: 'DATA_PATH', useValue: 'mock/path/to/data.csv' },
        {
          provide: 'READ_FILE_SYNC',
          useValue: jest.fn().mockReturnValue(mockTedTalkData),
        },
      ],
    }).compile();

    service = module.get<AutocompleteService>(AutocompleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
