import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class WeeklyStats {
  @ApiProperty({ example: '40km' })
  @IsString()
  total_distance: string;

  @ApiProperty({ example: '49.75PLN' })
  @IsString()
  total_price: string;
}

export class DayStats {
  @ApiProperty({ example: 'July, 4th' })
  @IsString()
  day: string;

  @ApiProperty({ example: '12km' })
  @IsString()
  total_distance: string;

  @ApiProperty({ example: '4km' })
  @IsString()
  avg_ride: string;

  @ApiProperty({ example: '22.75PLN' })
  @IsString()
  avg_price: string;
}
