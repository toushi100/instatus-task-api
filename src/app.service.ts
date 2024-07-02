import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, event } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  createEvent(createEventData: Prisma.eventCreateInput) {
    return this.prisma.event.create({
      data: createEventData,
    });
  }
}
