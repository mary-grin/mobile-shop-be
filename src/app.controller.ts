import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {CreateMobileDeviceDto} from "./dto/create-mobile-device.dto";
import {CreateOrderDto} from "./dto/create-order.dto";

const devices = [];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/mobile-devices')
  getDevices() {
    return this.appService.getMobileDevices();
  }

  @Get('/mobile-devices/:id')
  getDevice(@Param('id') id: string): Promise<any> {
    return this.appService.getMobileDevice(id);
  }

  @Post('/mobile-devices')
  addDevice(@Body() createMobileDeviceDto: CreateMobileDeviceDto): Promise<any> {
    return this.appService.addMobileDevice(createMobileDeviceDto);
  }

  @Patch('/mobile-devices/:id')
  async updateMobileDevice(@Param('id') id: string, @Body() updateMobileDeviceDto: any): Promise<any> {
    return this.appService.updateDevice(id, updateMobileDeviceDto);
  }

  @Delete('/mobile-devices/:id')
  async deleteMobileDevice(@Param('id') id: string): Promise<any> {
    return this.appService.deleteDevice(id);
  }

  @Post('/script')
  runScript(): Promise<any> {
    return this.appService.runScript(devices);
  }

  @Get('/orders')
  async getOrders(): Promise<any> {
    return this.appService.getOrders();
  }

  @Post('/orders')
  async addOrder(@Body() createOrderDto: CreateOrderDto): Promise<any> {
    return this.appService.addOrder(createOrderDto);
  }
}
