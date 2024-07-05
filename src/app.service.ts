import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, event } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  createEvent(createEventData: CreateEventDto): Promise<event> {
    const data = {
      ...createEventData,
      actor_id: `actor_${uuidv4()}`,
      action_id: `action_${uuidv4()}`,
      metadata_request_id: `request_${uuidv4()}`,
      target_id: `target_${uuidv4()}`,
      occurred_at: new Date(),
    };

    return this.prisma.event.create({
      data,
    });
  }

  indexEvent(params: {
    skip?: number;
    take?: number;

    where?: Prisma.eventWhereInput;
    orderBy?: Prisma.eventOrderByWithRelationInput;
  }): Promise<event[]> {
    const { skip, take, where, orderBy } = params;
    const order = orderBy ? orderBy : { occurred_at: Prisma.SortOrder.desc };

    return this.prisma.event.findMany({
      skip,
      take,
      where,
      orderBy: order,
    });
  }
}
