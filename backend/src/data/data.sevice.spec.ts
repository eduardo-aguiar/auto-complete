import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { TedTalk } from './data.types';

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataService],
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return suggestions', async () => {
    await service.onModuleInit();
    const suggestions = service.getSuggestions('a', 10);
    expect(suggestions.length).toBeLessThanOrEqual(10);
  });
});
