import { DiscussionRepository } from './discussion.repository';
export declare class DiscussionService {
    private readonly discussionRepository;
    constructor(discussionRepository: DiscussionRepository);
    getDiscussionsByLesson(lessonId: number): Promise<({
        user: {
            id: number;
            name: string;
            avatar: string | null;
        };
        replies: ({
            user: {
                id: number;
                name: string;
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
    createDiscussion(lessonId: number, userId: number, comment: string): Promise<{
        user: {
            id: number;
            name: string;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        lessonId: number;
        comment: string;
    }>;
    createReply(discussionId: number, userId: number, comment: string): Promise<{
        user: {
            id: number;
            name: string;
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
//# sourceMappingURL=discussion.service.d.ts.map