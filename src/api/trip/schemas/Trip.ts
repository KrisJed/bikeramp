import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TripDocument = Trip & Document;

@Schema()
export class Trip {
  @Prop({ required: true })
  start_address: string;

  @Prop({ required: true })
  destination_address: string;

  @Prop({ required: true })
  distance: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  date: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
