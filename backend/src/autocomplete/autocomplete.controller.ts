import { Controller, Get, Query, Inject } from '@nestjs/common';
import { AutocompleteService } from './autocomplete.service';

@Controller('autocomplete')
export class AutocompleteController {
  constructor(private readonly autocompleteService: AutocompleteService) {}

  @Get()
  getSuggestions(
    @Query('q') query: string,
    @Query('limit') limit: number = 10,
  ) {
    return this.autocompleteService.findSuggestions(query, limit);
  }
}
