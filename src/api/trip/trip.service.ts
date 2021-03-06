import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import nodeGeocoder from 'node-geocoder';
import { GeoPosition } from 'geo-position.ts';
import { ConfigService } from '@nestjs/config';

import { CreateTripDto } from './dto/CreateTripDto';
import { Trip, TripDocument } from './schemas/Trip';
import { GetTripsByRangeDto } from './dto/GetTripsByRangeDto';
import { LoggerService } from 'src/common/logger/logger.service';
import { UnitsConfig } from 'src/config/application.interface';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(Trip.name) private readonly tripModel: Model<TripDocument>,
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) { }

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const { start_address, destination_address } = createTripDto;

    const distance = await this.calculateDistance(
      start_address,
      destination_address,
    );

    const createdTrip = new this.tripModel({
      ...createTripDto,
      distance,
    });

    await createdTrip.save();

    const { distance: distanceUnit } = this.configService.get<UnitsConfig>('units');

    this.logger.log(
      `New trip from ${start_address} to ${destination_address} created. Distance: ${distance}${distanceUnit}`,
    );

    return createdTrip;
  }

  async getTripsByRange(dateRanges: GetTripsByRangeDto): Promise<Trip[]> {
    const { startDate, endDate } = dateRanges;

    return this.tripModel
      .find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .sort({ date: 1 });
  }

  private async calculateDistance(
    startAddress: string,
    destinationAddress: string,
  ): Promise<number> {
    const geocoder = nodeGeocoder({ provider: 'openstreetmap' });

    const startAddressData = await geocoder.geocode(startAddress);
    const destinationAddressData = await geocoder.geocode(destinationAddress);

    const { latitude: startLatitude, longitude: startLongitude } =
      startAddressData[0];
    const { latitude: destinationLatitude, longitude: destinationLongitude } =
      destinationAddressData[0];

    const startPosition = new GeoPosition(startLatitude, startLongitude);
    const destinationPosition = new GeoPosition(
      destinationLatitude,
      destinationLongitude,
    );

    return (
      Number(startPosition.Distance(destinationPosition).toFixed(0)) / 1000
    );
  }
}
