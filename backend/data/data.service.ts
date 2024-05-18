import { Injectable, OnModuleInit } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as csv from 'csv-parser';
import { TedTalk } from './data.types';

@Injectable()
export class DataService implements OnModuleInit {
  private data: TedTalk[] = [];

  async onModuleInit() {
    await this.loadCSVData();
  }

  private async loadCSVData() {
    const results: TedTalk[] = [];
    const filePath = join(__dirname, '..', '..', 'data', 'data.csv');
    return new Promise<void>((resolve, reject) => {
      createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          this.data = results;
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }

  getSuggestions(query: string, limit: number = 10): TedTalk[] {
    const lowerCaseQuery = query.toLowerCase();
    return this.data
      .filter(
        (talk) =>
          talk.title.toLowerCase().includes(lowerCaseQuery) ||
          talk.author.toLowerCase().includes(lowerCaseQuery),
      )
      .slice(0, limit);
  }

  async find(): Promise<TedTalk[]> {
    return this.data;
  }

  async count(): Promise<number> {
    return this.data.length;
  }
}
