import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
    @Prop({ required: true })
    ids: Array<string>;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({requires: true})
    totalPrice: number;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
