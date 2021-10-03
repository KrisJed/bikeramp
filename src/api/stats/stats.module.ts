import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CommonModule } from 'src/common/common.module';
import { DateService } from 'src/common/date/date.service';
import { TripModule } from '../trip/trip.module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [TripModule, CommonModule],
  controllers: [StatsController],
  providers: [StatsService, DateService, ConfigService],
})
export class StatsModule {}
