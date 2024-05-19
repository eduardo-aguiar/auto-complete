import {
  Injectable,
  Inject,
  LoggerService,
  Logger,
  Optional,
} from '@nestjs/common';
import { TedTalk } from '../data/data.types';

@Injectable()
export class AutocompleteService {
  private readonly logger: LoggerService;
  private tedTalks: TedTalk[] = [];

  constructor(
    @Inject('DATA_PATH') private dataPath: string,
    @Inject('READ_FILE_SYNC')
    private readFileSync: (
      path: string,
      options: { encoding: string },
    ) => string,
    @Optional() logger?: LoggerService,
  ) {
    this.logger = logger || new Logger(AutocompleteService.name);
    this.loadData();
  }

  private loadData(): void {
    try {
      const fileContent = this.readFileSync(this.dataPath, {
        encoding: 'utf-8',
      });
      const lines = fileContent.split('\n');

      this.tedTalks = lines.slice(1).map((line) => {
        const [title, author, date, views, likes, link] = line.split(',');
        return { title, author, date, views, likes, link } as TedTalk;
      });
    } catch (error) {
      if (error.message.includes('ENOENT')) {
        this.logger.error('File not found', error.stack);
        throw new Error('The data file could not be found.');
      } else if (error.message.includes('EACCES')) {
        this.logger.error('Permission denied', error.stack);
        throw new Error('Permission denied when accessing the data file.');
      } else {
        this.logger.error('Error reading data file', error.stack);
        throw new Error('An error occurred while reading the data file.');
      }
    }
  }

  public findSuggestions(query: string, limit: number = 10): TedTalk[] {
    const lowercaseQuery = query.toLowerCase();
    const filtered = this.tedTalks.filter(
      (talk) =>
        talk.title?.toLowerCase().includes(lowercaseQuery) ||
        talk.author?.toLowerCase().includes(lowercaseQuery),
    );

    return filtered.slice(0, limit);
  }
}
