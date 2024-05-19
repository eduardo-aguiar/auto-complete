import { Injectable, Inject } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { TedTalk } from '../data/data.types';

@Injectable()
export class AutocompleteService {
  private tedTalks: TedTalk[] = [];

  constructor(
    @Inject('DATA_PATH') private dataPath: string,
    @Inject('READ_FILE_SYNC')
    private readFileSync: (
      path: string,
      options: { encoding: string },
    ) => string,
  ) {
    this.loadData();
  }

  private loadData(): void {
    const fileContent = this.readFileSync(this.dataPath, { encoding: 'utf-8' });
    const lines = fileContent.split('\n');

    this.tedTalks = lines.slice(1).map((line) => {
      const [title, author, date, views, likes, link] = line.split(',');
      return { title, author, date, views, likes, link } as TedTalk;
    });
  }

  public findSuggestions(query: string, limit: number = 10): TedTalk[] {
    const lowercaseQuery = query.toLowerCase();
    const filtered = this.tedTalks.filter(
      (talk) =>
        talk.title.toLowerCase().includes(lowercaseQuery) ||
        talk.author.toLowerCase().includes(lowercaseQuery),
    );

    return filtered.slice(0, limit);
  }
}
