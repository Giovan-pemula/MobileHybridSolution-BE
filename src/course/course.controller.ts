import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query,
  ParseIntPipe, UseGuards, UseInterceptors, UploadedFile, Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse,
  ApiParam, ApiQuery, ApiConsumes, ApiBody, ApiProperty,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createCourseSchema, updateCourseSchema } from './course.validation';
import { imageUploadOptions } from '../common/multer/multer.config';
import { z } from 'zod';

class CreateCourseDto {
  @ApiProperty({ example: 'Belajar NestJS dari Nol' })            title: string;
  @ApiProperty({ example: 'Kursus NestJS lengkap untuk pemula.' }) description: string;
  @ApiProperty({ example: 150000 })                               price: number;
  @ApiProperty({ example: 1, description: 'ID kategori' })        categoryId: number;
}

class UpdateCourseDto {
  @ApiProperty({ example: 'NestJS Advanced', required: false })                                    title?: string;
  @ApiProperty({ example: 'Deskripsi baru.', required: false })                                   description?: string;
  @ApiProperty({ example: 200000, required: false })                                              price?: number;
  @ApiProperty({ example: 'PUBLISHED', enum: ['DRAFT','PUBLISHED','ARCHIVED'], required: false }) status?: string;
}

class UploadThumbnailDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'File gambar thumbnail' }) thumbnail: any;
}

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua kursus publik (PUBLISHED)', description: 'Mendukung filter via query: search, categoryId, page, limit.' })
  @ApiQuery({ name: 'search',     required: false, description: 'Cari berdasarkan judul kursus' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Filter berdasarkan ID kategori' })
  @ApiQuery({ name: 'page',       required: false, example: '1' })
  @ApiQuery({ name: 'limit',      required: false, example: '10' })
  @ApiResponse({ status: 200, description: 'Daftar kursus berhasil diambil.' })
  async getCourses(@Query() query: Record<string, any>) {
    const result = await this.courseService.getAllCourses(query);
    return { data: result, message: 'Courses fetched successfully' };
  }

  @Get('manage')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[TRAINER/ADMIN] Ambil kursus untuk dikelola', description: 'TRAINER hanya melihat kursus miliknya sendiri. ADMIN melihat semua kursus.' })
  @ApiResponse({ status: 200, description: 'Kursus berhasil diambil.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak.' })
  async getCoursesForAdmin(
    @Query() query: Record<string, any>,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    if (user.role === 'TRAINER') query = { ...query, trainerId: String(user.id) };
    const result = await this.courseService.getAllCoursesForAdmin(query);
    return { data: result, message: 'Courses fetched successfully' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail kursus berdasarkan ID', description: 'Jika pengguna sudah login & terdaftar, konten lesson akan ikut dikembalikan.' })
  @ApiParam({ name: 'id', description: 'ID kursus' })
  @ApiResponse({ status: 200, description: 'Detail kursus berhasil diambil.' })
  @ApiResponse({ status: 404, description: 'Kursus tidak ditemukan.' })
  async getCourse(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    const user = (req as any).user as CurrentUserPayload | undefined;
    if (user?.id) {
      const course = await this.courseService.getCourseByIdForEnrolled(id, user.id);
      return { data: course, message: 'Course fetched successfully' };
    }
    const course = await this.courseService.getCourseById(id);
    return { data: course, message: 'Course fetched successfully' };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[TRAINER/ADMIN] Buat kursus baru' })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({ status: 201, description: 'Kursus berhasil dibuat.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak.' })
  async createCourse(
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(createCourseSchema)) body: z.infer<typeof createCourseSchema>,
  ) {
    const course = await this.courseService.createCourse(user.id, body);
    return { data: course, message: 'Course created successfully' };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[TRAINER/ADMIN] Update kursus', description: 'Ubah detail kursus atau ubah status (DRAFT → PUBLISHED → ARCHIVED).' })
  @ApiParam({ name: 'id', description: 'ID kursus' })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, description: 'Kursus berhasil diperbarui.' })
  async updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(updateCourseSchema)) body: z.infer<typeof updateCourseSchema>,
  ) {
    const course = await this.courseService.updateCourse(id, user.id, user.role, body);
    const statusMsg = body.status === 'ARCHIVED' ? 'archived' : 'updated';
    return { data: course, message: `Course "${course.title}" ${statusMsg} successfully` };
  }

  @Get(':courseId/students')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[TRAINER/ADMIN] Ambil daftar siswa dalam kursus' })
  @ApiParam({ name: 'courseId', description: 'ID kursus' })
  @ApiQuery({ name: 'page',  required: false, example: '1' })
  @ApiQuery({ name: 'limit', required: false, example: '10' })
  @ApiResponse({ status: 200, description: 'Daftar siswa berhasil diambil.' })
  async getCourseStudents(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Query() query: Record<string, any>,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.courseService.getCourseStudents(courseId, query, user.id, user.role);
    return { data: result, message: 'Students fetched successfully' };
  }

  @Patch(':id/thumbnail')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
  @UseInterceptors(FileInterceptor('thumbnail', imageUploadOptions()))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[TRAINER/ADMIN] Upload thumbnail kursus', description: 'Gunakan `multipart/form-data` dengan field bernama `thumbnail`.' })
  @ApiParam({ name: 'id', description: 'ID kursus' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadThumbnailDto })
  @ApiResponse({ status: 200, description: 'Thumbnail berhasil diupload.' })
  async uploadThumbnail(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const course = await this.courseService.uploadThumbnail(id, user.id, user.role, file);
    return { data: course, message: 'Thumbnail uploaded successfully' };
  }
}
