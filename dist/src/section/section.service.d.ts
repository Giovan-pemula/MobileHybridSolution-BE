import { SectionRepository } from './section.repository';
import { CourseRepository } from '../course/course.repository';
export declare class SectionService {
    private readonly sectionRepository;
    private readonly courseRepository;
    constructor(sectionRepository: SectionRepository, courseRepository: CourseRepository);
    getSectionsByCourse(courseId: number): Promise<({
        lessons: {
            order: number;
            id: number;
            title: string;
            duration: number | null;
            youtubeUrl: string | null;
            isPreview: boolean;
            sectionId: number;
        }[];
    } & {
        order: number;
        id: number;
        title: string;
        courseId: number;
    })[]>;
    createSection(courseId: number, userId: number, userRole: string, data: {
        title: string;
        order?: number;
    }): Promise<{
        order: number;
        id: number;
        title: string;
        courseId: number;
    }>;
    updateSection(id: number, userId: number, userRole: string, data: {
        title?: string;
        order?: number;
    }): Promise<{
        order: number;
        id: number;
        title: string;
        courseId: number;
    }>;
    deleteSection(id: number, userId: number, userRole: string): Promise<{
        order: number;
        id: number;
        title: string;
        courseId: number;
    }>;
}
//# sourceMappingURL=section.service.d.ts.map