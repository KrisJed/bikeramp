import { IsDate } from 'class-validator';

export class GetTripsByRangeDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
