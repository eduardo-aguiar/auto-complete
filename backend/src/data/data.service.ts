import { Injectable, OnModuleInit } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as csv from 'csv-parser';
import { TedTalk } from './data.types';
import { Logger } from '@nestjs/common';

@Injectable()
export class DataService implements OnModuleInit {
  private data: TedTalk[] = [];
  private logger = new Logger(DataService.name);

  async onModuleInit() {
    await this.loadCSVData();
  }

  private async loadCSVData() {
    const results: TedTalk[] = [];
    const filePath = join(__dirname, '..', '..', 'src', 'data', 'data.csv');
    return new Promise<void>((resolve, reject) => {
      createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          this.data = results;
          this.logger.log('CSV data loaded successfully');
          resolve();
        })
        .on('error', (error) => {
          this.logger.error('Error loading CSV data', error.stack);
          reject(error);
        });
    });
  }

  getSuggestions(query: string, limit: number = 10): TedTalk[] {
    const lowerCaseQuery = query.toLowerCase();
    const matches = this.data.filter(
      (talk) =>
        talk.title.toLowerCase().includes(lowerCaseQuery) ||
        talk.author.toLowerCase().includes(lowerCaseQuery),
    );
    return matches.slice(0, limit);
  }
}
