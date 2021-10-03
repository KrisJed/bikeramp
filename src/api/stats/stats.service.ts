import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DateService } from 'src/common/date/date.service';
import { UnitsConfig } from 'src/config/application.interface';

import { Trip } from '../trip/schemas/Trip';
import { DayStats, WeeklyStats } from './stats.interfaces';

@Injectable()
export class StatsService {
  constructor(
    private readonly dateService: DateService,
    private readonly configService: ConfigService,
  ) { }

  countWeeklyStats(trips: Trip[]): WeeklyStats {
    const { totalDistance, totalPrice } =
      this.countTripsTotalDistanceAndPrice(trips);

    const { currency, distance } = this.configService.get<UnitsConfig>('units');

    return {
      total_distance: `${totalDistance}${distance}`,
      total_price: `${totalPrice}${currency}`,
    };
  }

  countMonthlyStats(trips: Trip[]): DayStats[] {
    const { currency, distance } = this.configService.get<UnitsConfig>('units');

    const activeDays: number[] = [];
    for (const trip of trips) {
      const tripDate = this.dateService.getDate(trip.date).date();

      if (activeDays.includes(tripDate)) {
        continue;
      }

      activeDays.push(tripDate);
    }

    const dayStats: DayStats[] = [];
    for (const currentDay of activeDays) {
      const currentDayTrips = trips.filter(
        (trip) => this.dateService.getDate(trip.date).date() === currentDay,
      );

      const { totalDistance, totalPrice } =
        this.countTripsTotalDistanceAndPrice(currentDayTrips);

      dayStats.push({
        day: this.dateService.getFormattedDate(
          currentDayTrips[0].date,
          'MMMM, Do',
        ),
        total_distance: totalDistance.toString(),
        avg_ride: `${totalDistance / currentDayTrips.length}${distance}`,
        avg_price: `${totalPrice / currentDayTrips.length}${currency}`,
      });
    }

    return dayStats;
  }

  private countTripsTotalDistanceAndPrice(trips: Trip[]) {
    let totalDistance = 0;
    let totalPrice = 0;

    for (const trip of trips) {
      totalDistance += trip.distance;
      totalPrice += trip.price;
    }

    return { totalDistance, totalPrice };
  }
}
