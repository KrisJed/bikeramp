import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './schemas/Trip';

import { TripController } from './trip.controller';
import { TripService } from './trip.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
