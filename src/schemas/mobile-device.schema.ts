import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MobileDevice extends Document {
    @Prop({ required: true })
    model: string;

    @Prop({ required: true })
    actualPrice: number;

    @Prop({ required: true })
    oldPrice: null | number;

    @Prop({ required: true })
    memory: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    color: string;
}

export const MobileDeviceSchema = SchemaFactory.createForClass(MobileDevice);
