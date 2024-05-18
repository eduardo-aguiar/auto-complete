import { Module } from '@nestjs/common';
import { AutocompleteController } from './autocomplete.controller';
import { DataService } from '../../data/data.service';

@Module({
  controllers: [AutocompleteController],
  providers: [DataService],
})
export class AutocompleteModule {}
