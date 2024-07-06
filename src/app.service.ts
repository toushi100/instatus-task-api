import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Event } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  createEvent(createEventData: CreateEventDto): Promise<Event> {
    const data = {
      ...createEventData,
      actor_id: `actor_${uuidv4()}`,
      action_id: `action_${uuidv4()}`,
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
    orderBy?: Prisma.EventOrderByWithRelationInput;
    actor_id?: string;
    action_id?: string;
    target_id?: string;
    q?: string;
  }): Promise<Event[]> {
    const { skip, take, orderBy, q, actor_id, action_id, target_id } = params;

    const order = orderBy ? orderBy : { occurred_at: Prisma.SortOrder.desc };
    const search = q
      ? {
          OR: [
            { actor_name: { contains: q } },
            { actor_email: { contains: q } },
            { action_name: { contains: q } },
          ],
        }
      : {};

    const where: Prisma.EventWhereInput = {
      AND: [search, { actor_id, action_id, target_id }],
    };

    return await this.prisma.event.findMany({
      skip,
      take,
      where,
      orderBy: order,
    });
  }
}
