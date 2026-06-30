import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionService } from '../src/discussion/discussion.service';
import { DiscussionRepository } from '../src/discussion/discussion.repository';
import { NotFoundException } from '@nestjs/common';

describe('DiscussionService', () => {
  let service: DiscussionService;
  let repository: jest.Mocked<DiscussionRepository>;

  beforeEach(async () => {
    const mockDiscussionRepository = {
      findByLessonId: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      createReply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscussionService,
        { provide: DiscussionRepository, useValue: mockDiscussionRepository },
      ],
    }).compile();

    service = module.get<DiscussionService>(DiscussionService);
    repository = module.get(DiscussionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDiscussionsByLesson', () => {
    it('should return discussions of a lesson', async () => {
      repository.findByLessonId.mockResolvedValue([{ id: 1, comment: 'Nice lesson' }] as any);
      const result = await service.getDiscussionsByLesson(10);
      expect(result).toHaveLength(1);
      expect(repository.findByLessonId).toHaveBeenCalledWith(10);
    });
  });

  describe('createDiscussion', () => {
    it('should create discussion successfully', async () => {
      repository.create.mockResolvedValue({ id: 1, comment: 'Help please' } as any);
      const result = await service.createDiscussion(10, 1, 'Help please');
      expect(result.id).toBe(1);
      expect(repository.create).toHaveBeenCalledWith({ lessonId: 10, userId: 1, comment: 'Help please' });
    });
  });

  describe('createReply', () => {
    it('should create reply successfully if parent discussion exists', async () => {
      repository.findById.mockResolvedValue({ id: 1, comment: 'Parent comment' } as any);
      repository.createReply.mockResolvedValue({ id: 2, comment: 'My reply' } as any);

      const result = await service.createReply(1, 2, 'My reply');
      expect(result.id).toBe(2);
      expect(repository.createReply).toHaveBeenCalledWith({ discussionId: 1, userId: 2, comment: 'My reply' });
    });

    it('should throw NotFoundException if parent discussion does not exist', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.createReply(99, 2, 'Reply')).rejects.toThrow(NotFoundException);
    });
  });
});
