import prisma from '../config/database';

export class DiscussionRepository {
  async findByLessonId(lessonId: number) {
    return prisma.discussion.findMany({
      where: { lessonId },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        replies: {
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number) {
    return prisma.discussion.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        replies: {
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
    });
  }

  async create(data: { lessonId: number; userId: number; comment: string }) {
    return prisma.discussion.create({
      data,
      include: {
        user: { select: { id: true, name: true, avatar: true } },
      },
    });
  }

  async createReply(data: { discussionId: number; userId: number; comment: string }) {
    return prisma.reply.create({
      data,
      include: {
        user: { select: { id: true, name: true, avatar: true } },
      },
    });
  }
}

export const discussionRepository = new DiscussionRepository();
