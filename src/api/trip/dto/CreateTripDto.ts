import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
  @ApiProperty({ example: 'Plac Europejski 2, Warszawa, Polska' })
  @IsString()
  start_address: string;

  @ApiProperty({ example: 'Grzybowska 62, 00-844 Warszawa, Polska' })
  @IsString()
  destination_address: string;

  @ApiProperty({ example: '5PLN' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: '2021-10-01T16:15:00.000Z' })
  @IsDate()
  date: Date;
}
