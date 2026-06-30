import { DiscussionRepository } from './discussion.repository';
export declare class DiscussionService {
    private readonly discussionRepository;
    constructor(discussionRepository: DiscussionRepository);
    getDiscussionsByLesson(lessonId: number): Promise<({
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
        comment: string;
        lessonId: number;
    })[]>;
    createDiscussion(lessonId: number, userId: number, comment: string): Promise<{
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
        lessonId: number;
    }>;
    createReply(discussionId: number, userId: number, comment: string): Promise<{
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
//# sourceMappingURL=discussion.service.d.ts.map