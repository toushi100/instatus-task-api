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

  async indexEvent(params: {
    skip?: number;
    take?: number;

    where?: Prisma.eventWhereInput;
    orderBy?: Prisma.eventOrderByWithRelationInput;
    q?: string;
  }): Promise<event[]> {
    const { skip, take, where, orderBy, q } = params;

    const order = orderBy ? orderBy : { occurred_at: Prisma.SortOrder.desc };
    const search = q
      ? {
          OR: [
            { actor_name: { contains: q } },
            { action_name: { contains: q } },
            { target_name: { contains: q } },
            { group: { contains: q } },
          ],
        }
      : {};
    if (where) {
      where.AND = search;
    }

    return await this.prisma.event.findMany({
      skip,
      take,
      where,
      orderBy: order,
    });
  }
}
