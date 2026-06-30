import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../src/category/category.service';
import { CategoryRepository } from '../src/category/category.repository';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: jest.Mocked<CategoryRepository>;

  beforeEach(async () => {
    const mockCategoryRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findBySlug: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: CategoryRepository, useValue: mockCategoryRepository },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get(CategoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCategories', () => {
    it('should return all categories', async () => {
      repository.findAll.mockResolvedValue([{ id: 1, name: 'Web Dev', slug: 'web-dev' }] as any);
      const result = await service.getAllCategories();
      expect(result).toHaveLength(1);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('getCategoryById', () => {
    it('should return category if exists', async () => {
      repository.findById.mockResolvedValue({ id: 1, name: 'Web Dev' } as any);
      const result = await service.getCategoryById(1);
      expect(result.name).toBe('Web Dev');
    });

    it('should throw NotFoundException if category does not exist', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.getCategoryById(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createCategory', () => {
    it('should create new category successfully', async () => {
      repository.findBySlug.mockResolvedValue(null);
      repository.create.mockResolvedValue({ id: 2, name: 'AI & Data Science', slug: 'ai-data-science' } as any);

      const result = await service.createCategory({ name: 'AI & Data Science' });
      expect(result.id).toBe(2);
      expect(repository.create).toHaveBeenCalledWith({ name: 'AI & Data Science', slug: 'ai-data-science' });
    });

    it('should throw ConflictException if slug already exists', async () => {
      repository.findBySlug.mockResolvedValue({ id: 1 } as any);
      await expect(service.createCategory({ name: 'Web Dev' })).rejects.toThrow(ConflictException);
    });
  });

  describe('updateCategory', () => {
    it('should update name and slug of category', async () => {
      repository.findById.mockResolvedValue({ id: 1, name: 'Old' } as any);
      repository.update.mockResolvedValue({ id: 1, name: 'New', slug: 'new' } as any);

      const result = await service.updateCategory(1, { name: 'New' });
      expect(result.name).toBe('New');
      expect(repository.update).toHaveBeenCalledWith(1, { name: 'New', slug: 'new' });
    });

    it('should throw NotFoundException on updating non-existent category', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.updateCategory(99, { name: 'New' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteCategory', () => {
    it('should delete category', async () => {
      repository.findById.mockResolvedValue({ id: 1 } as any);
      repository.delete.mockResolvedValue({ id: 1 } as any);

      const result = await service.deleteCategory(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException on deleting non-existent category', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.deleteCategory(99)).rejects.toThrow(NotFoundException);
    });
  });
});
