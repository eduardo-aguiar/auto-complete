import { Controller, Get, Query } from '@nestjs/common';
import { DataService } from '../../data/data.service';
import { TedTalk } from '../../data/data.types';

@Controller('autocomplete')
export class AutocompleteController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  getSuggestions(
    @Query('q') query: string,
    @Query('limit') limit: string,
  ): TedTalk[] {
    const limitNumber = parseInt(limit, 10) || 10;
    return this.dataService.getSuggestions(query, limitNumber);
  }
}
