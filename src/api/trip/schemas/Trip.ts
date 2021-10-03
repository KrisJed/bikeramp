import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type TripDocument = Trip & Document;

@Schema()
export class Trip {
  @Prop({ required: true })
  @ApiProperty({ example: 'Plac Europejski 2, Warszawa, Polska' })
  start_address: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'Grzybowska 62, 00-844 Warszawa, Polska' })
  destination_address: string;

  @Prop({ required: true })
  @ApiProperty({ example: '0.3km' })
  distance: number;

  @Prop({ required: true })
  @ApiProperty({ example: '5PLN' })
  price: number;

  @Prop({ required: true })
  @ApiProperty({ example: '2021-10-01T16:15:00.000Z' })
  date: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
