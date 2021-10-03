import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { TripModule } from './api/trip/trip.module';
import { StatsModule } from './api/stats/stats.module';
import { CommonModule } from './common/common.module';
import appConfig from './config/application';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('db.connectionString'),
      }),
      inject: [ConfigService],
    }),
    TripModule,
    StatsModule,
    CommonModule,
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
