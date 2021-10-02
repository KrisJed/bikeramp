import { IsString } from 'class-validator';

export class CreateTripDto {
  @IsString()
  start_address: string;

  @IsString()
  destination_address: string;

  @IsString()
  price: number;

  @IsString()
  date: Date;
}
