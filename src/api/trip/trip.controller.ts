import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTripDto } from './dto/CreateTripDto';
import { Trip } from './schemas/Trip';
import { TripService } from './trip.service';

@ApiTags('trips')
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @ApiOperation({ summary: 'Create trip' })
  @ApiResponse({ status: 200, description: 'OK', type: Trip })
  @Post()
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }
}
