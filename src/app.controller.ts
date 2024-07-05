import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createEvent(@Body() createEventData: Prisma.eventCreateInput) {
    return await this.appService.createEvent(createEventData);
  }
  @Get()
  async indexEvent(
    @Query()
    params: {
      skip?: string;
      take?: string;
      where?: string;
      orderBy?: string;
      q?: string;
    },
  ) {
    const skip = params.skip ? parseInt(params.skip) : undefined;
    const take = params.take ? parseInt(params.take) : undefined;
    const where = params.where ? JSON.parse(params.where) : {};
    const orderBy = params.orderBy ? JSON.parse(params.orderBy) : undefined;

    const moddedParams = {
      orderBy: orderBy,
      where: where,
      skip: skip,
      take: take,
      q: params.q,
    };
    return await this.appService.indexEvent(moddedParams);
  }
}
