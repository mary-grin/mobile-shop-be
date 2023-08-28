import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {MobileDevice} from "./schemas/mobile-device.schema";
import {CreateOrderDto} from "./dto/create-order.dto";
import {Order} from "./schemas/order.schema";

@Injectable()
export class AppService {
  constructor(
      @InjectModel(MobileDevice.name) private mobileDeviceModel: Model<any>,
      @InjectModel(Order.name) private orderModel: Model<any>
  ) {
  }

  async getMobileDevices(): Promise<any> {
    return this.mobileDeviceModel.find();
  }

  async getMobileDevice(id): Promise<any> {
    return this.mobileDeviceModel.findById(id);
  }

  async addMobileDevice(createMobileDeviceDto: any): Promise<any> {
    const createdMobileDevices = new this.mobileDeviceModel(createMobileDeviceDto);
    await createdMobileDevices.save();
    return this.mobileDeviceModel.find();
  }

  async updateDevice(id, updateMobileDeviceDto): Promise<any> {
    await this.mobileDeviceModel.findByIdAndUpdate(id, updateMobileDeviceDto, { new: true });
    return this.mobileDeviceModel.find();
  }

  async deleteDevice(id): Promise<any> {
    await this.mobileDeviceModel.findByIdAndRemove(id);
    return { message: 'Order deleted successfully' }
  }

  async getOrders(): Promise<any> {
    const orders: Order[] = await this.orderModel.find()
    const allDevices = await this.getMobileDevices();
    return orders.map(order => {
      return {
        name: order.name,
        email: order.email,
        createdAt: order.createdAt,
        devices: allDevices.filter(device => order.ids.includes(device._id)),
      }
    });
  }

  async addOrder(order): Promise<any> {
    const createdOrder = new this.orderModel(order);
    await createdOrder.save();
    return { message: 'Order created successfully' };
  }

  async runScript(devices: any[]) {
    devices.forEach(device => {
      const createdMobileDevices = new this.mobileDeviceModel(device);
      return createdMobileDevices.save();
    })
  }
}
