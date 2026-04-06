import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class DiscussionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByLessonId(lessonId: number) {
    return this.prisma.discussion.findMany({
      where: { lessonId },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        replies: {
          include: { user: { select: { id: true, name: true, avatar: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number) {
    return this.prisma.discussion.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        replies: { include: { user: { select: { id: true, name: true, avatar: true } } } },
      },
    });
  }

  async create(data: { lessonId: number; userId: number; comment: string }) {
    return this.prisma.discussion.create({
      data,
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
  }

  async createReply(data: { discussionId: number; userId: number; comment: string }) {
    return this.prisma.reply.create({
      data,
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
  }
}
