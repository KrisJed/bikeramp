import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DateService } from 'src/common/date/date.service';
import { TripService } from '../trip/trip.service';
import { DayStats, WeeklyStats } from './stats.interfaces';
import { StatsService } from './stats.service';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(
    private readonly statsService: StatsService,
    private readonly tripService: TripService,
    private readonly dateService: DateService,
  ) { }

  @ApiOperation({ summary: 'Get weekly trips stats' })
  @ApiResponse({ status: 200, description: 'OK', type: WeeklyStats })
  @Get('weekly')
  async getWeeklyStats(): Promise<WeeklyStats> {
    const weekRanges = this.dateService.getCurrentRange('week');

    const thisWeekTrips = await this.tripService.getTripsByRange(weekRanges);

    return this.statsService.countWeeklyStats(thisWeekTrips);
  }

  @ApiOperation({ summary: 'Get monthly trips stats' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: DayStats,
    isArray: true,
  })
  @Get('monthly')
  async getMonthlyStats(): Promise<DayStats[]> {
    const monthRanges = this.dateService.getCurrentRange('month');

    const thisMonthTrips = await this.tripService.getTripsByRange(monthRanges);

    return this.statsService.countMonthlyStats(thisMonthTrips);
  }
}
