import {Module, OnModuleInit} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {MobileDevice, MobileDeviceSchema} from "./schemas/mobile-device.schema";
import {Order, OrderSchema} from "./schemas/order.schema";

function createMongoOptions() {
  return {
    uri: process.env.MONGODB_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: createMongoOptions,
    }),
    MongooseModule.forFeature([
      {name: MobileDevice.name, schema: MobileDeviceSchema},
      {name: Order.name, schema: OrderSchema}
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
