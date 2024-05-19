import { Module } from '@nestjs/common';
import { AutocompleteController } from './autocomplete.controller';
import { AutocompleteService } from './autocomplete.service';

@Module({
  controllers: [AutocompleteController],
  providers: [
    AutocompleteService,
    { provide: 'DATA_PATH', useValue: 'src/data/data.csv' },
    { provide: 'READ_FILE_SYNC', useValue: require('fs').readFileSync },
  ],
})
export class AutocompleteModule {}
