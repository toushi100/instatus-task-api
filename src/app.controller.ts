import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/events')
  async createEvent(@Body() createEventData: Prisma.EventCreateInput) {
    return await this.appService.createEvent(createEventData);
  }
  @Get('/events')
  async indexEvent(
    @Query()
    params: {
      skip?: string;
      take?: string;
      q?: string;
    },
    @Query('actor_id') actor_id: string,
    @Query('action_id') action_id: string,
    @Query('target_id') target_id: string,
  ) {
    const skip = params.skip ? parseInt(params.skip) : undefined;
    const take = params.take ? parseInt(params.take) : undefined;

    const moddedParams = {
      actor_id: actor_id,
      action_id: action_id,
      target_id: target_id,
      skip: skip,
      take: take,
      q: params.q,
    };
    return await this.appService.indexEvent(moddedParams);
  }
}
