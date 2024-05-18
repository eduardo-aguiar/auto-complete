import { Module } from '@nestjs/common';
import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { DataService } from '../data/data.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [AutocompleteModule],
  controllers: [AppController],
  providers: [AppService, DataService],
})
export class AppModule {}
