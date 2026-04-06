import { SectionRepository } from './section.repository';
import { CourseRepository } from '../course/course.repository';
export declare class SectionService {
    private readonly sectionRepository;
    private readonly courseRepository;
    constructor(sectionRepository: SectionRepository, courseRepository: CourseRepository);
    getSectionsByCourse(courseId: number): Promise<({
        lessons: {
            id: number;
            title: string;
            order: number;
            youtubeUrl: string | null;
            duration: number | null;
            isPreview: boolean;
            sectionId: number;
        }[];
    } & {
        id: number;
        title: string;
        courseId: number;
        order: number;
    })[]>;
    createSection(courseId: number, userId: number, userRole: string, data: {
        title: string;
        order?: number;
    }): Promise<{
        id: number;
        title: string;
        courseId: number;
        order: number;
    }>;
    updateSection(id: number, userId: number, userRole: string, data: {
        title?: string;
        order?: number;
    }): Promise<{
        id: number;
        title: string;
        courseId: number;
        order: number;
    }>;
    deleteSection(id: number, userId: number, userRole: string): Promise<void>;
}
//# sourceMappingURL=section.service.d.ts.map