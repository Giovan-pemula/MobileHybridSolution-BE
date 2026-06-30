import { PrismaService } from '../common/prisma/prisma.service';
export declare class DiscussionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByLessonId(lessonId: number): Promise<({
        user: {
            name: string;
            id: number;
            avatar: string | null;
        };
        replies: ({
            user: {
                name: string;
                id: number;
                avatar: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            comment: string;
            discussionId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        lessonId: number;
        comment: string;
    })[]>;
    findById(id: number): Promise<({
        user: {
            name: string;
            id: number;
            avatar: string | null;
        };
        replies: ({
            user: {
                name: string;
                id: number;
                avatar: string | null;
            };
        } & {
            id: number;
            createdAt: Date;
            userId: number;
            comment: string;
            discussionId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        lessonId: number;
        comment: string;
    }) | null>;
    create(data: {
        lessonId: number;
        userId: number;
        comment: string;
    }): Promise<{
        user: {
            name: string;
            id: number;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        lessonId: number;
        comment: string;
    }>;
    createReply(data: {
        discussionId: number;
        userId: number;
        comment: string;
    }): Promise<{
        user: {
            name: string;
            id: number;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        comment: string;
        discussionId: number;
    }>;
}
//# sourceMappingURL=discussion.repository.d.ts.map