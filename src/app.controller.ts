import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createEvent(@Body() createEventData: Prisma.eventCreateInput) {
    return await this.appService.createEvent(createEventData);
  }
}
