import { DiscussionService } from './discussion.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { createDiscussionSchema, createReplySchema } from './discussion.validation';
import { z } from 'zod';
export declare class DiscussionController {
    private readonly discussionService;
    constructor(discussionService: DiscussionService);
    getDiscussions(lessonId: number): Promise<{
        data: ({
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
        })[];
        message: string;
    }>;
    createDiscussion(lessonId: number, user: CurrentUserPayload, body: z.infer<typeof createDiscussionSchema>): Promise<{
        data: {
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
        };
        message: string;
    }>;
    createReply(id: number, user: CurrentUserPayload, body: z.infer<typeof createReplySchema>): Promise<{
        data: {
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
        };
        message: string;
    }>;
}
//# sourceMappingURL=discussion.controller.d.ts.map