import { Module } from '@nestjs/common';
import { DateService } from './date/date.service';

@Module({
  exports: [DateService],
  providers: [DateService],
})
export class CommonModule {}
