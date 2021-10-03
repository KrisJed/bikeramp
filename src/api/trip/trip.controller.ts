import { Body, Controller, Post } from '@nestjs/common';

import { CreateTripDto } from './dto/CreateTripDto';
import { TripService } from './trip.service';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }
}
