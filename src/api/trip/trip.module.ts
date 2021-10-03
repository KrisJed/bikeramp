import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { LoggerModule } from 'src/common/logger/logger.module';
import { LoggerService } from 'src/common/logger/logger.service';
import { Trip, TripSchema } from './schemas/Trip';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { HttpModule } from '../http/http.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    LoggerModule,
    HttpModule,
  ],
  controllers: [TripController],
  providers: [TripService, LoggerService, ConfigService],
  exports: [TripService],
})
export class TripModule { }
