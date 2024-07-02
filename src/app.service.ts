import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, event } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  createEvent(createEventData: Prisma.eventCreateInput): Promise<event> {
    return this.prisma.event.create({
      data: createEventData,
    });
  }

  indexEvent(params: {
    skip?: number;
    take?: number;

    where?: Prisma.eventWhereInput;
    orderBy?: Prisma.eventOrderByWithRelationInput;
  }): Promise<event[]> {
    const { skip, take, where, orderBy } = params;

    return this.prisma.event.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }
}
