import {
  Controller, Post, Get, Patch, Param, Body, Query, ParseIntPipe,
  UseGuards, UseInterceptors, UploadedFile, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse,
  ApiParam, ApiQuery, ApiConsumes, ApiBody, ApiProperty,
} from '@nestjs/swagger';
import { TrainerRequestService } from './trainer-request.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { trainerRequestSchema, verifyTrainerSchema } from './trainerRequest.validation';
import { documentUploadOptions } from '../common/multer/multer.config';
import { z } from 'zod';

class SubmitTrainerRequestDto {
  @ApiProperty({ example: 'Saya adalah trainer berpengalaman dengan 5 tahun pengalaman.', description: 'Deskripsi motivasi menjadi trainer' })
  motivation: string;
  @ApiProperty({ type: 'string', format: 'binary', description: 'File CV dalam format PDF' })
  cv: any;
}

class VerifyTrainerDto {
  @ApiProperty({ example: 'APPROVED', enum: ['APPROVED', 'REJECTED'], description: 'Keputusan verifikasi trainer' })
  status: string;
}

@ApiTags('Trainer Request')
@ApiBearerAuth('access-token')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class TrainerRequestController {
  constructor(private readonly trainerRequestService: TrainerRequestService) {}

  @Post('trainer/request')
  @UseInterceptors(FileInterceptor('cv', documentUploadOptions()))
  @ApiOperation({ summary: 'Ajukan permintaan menjadi trainer', description: 'Upload CV (PDF) beserta motivasi. Gunakan `multipart/form-data`.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SubmitTrainerRequestDto })
  @ApiResponse({ status: 201, description: 'Permohonan trainer berhasil diajukan.' })
  @ApiResponse({ status: 400, description: 'File CV (PDF) wajib disertakan.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async submitTrainerRequest(
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(trainerRequestSchema)) body: z.infer<typeof trainerRequestSchema>,
    @UploadedFile() cvFile: Express.Multer.File,
  ) {
    if (!cvFile) {
      throw new BadRequestException('CV file (PDF) is required');
    }
    const request = await this.trainerRequestService.submitRequest(user.id, body, cvFile);
    return { data: request, message: 'Trainer request submitted' };
  }

  @Get('admin/trainer-requests')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[ADMIN] Ambil semua permohonan trainer', description: 'Dapat difilter berdasarkan status: PENDING, APPROVED, REJECTED.' })
  @ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'APPROVED', 'REJECTED'], description: 'Filter berdasarkan status permohonan' })
  @ApiResponse({ status: 200, description: 'Daftar permohonan trainer berhasil diambil.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak, bukan ADMIN.' })
  async getTrainerRequests(@Query('status') status?: string) {
    const requests = await this.trainerRequestService.getAllRequests(status);
    return { data: requests, message: 'Trainer requests fetched successfully' };
  }

  @Patch('admin/trainer/:id/verify')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[ADMIN] Setujui atau tolak permohonan trainer' })
  @ApiParam({ name: 'id', description: 'ID user yang mengajukan permohonan trainer' })
  @ApiBody({ type: VerifyTrainerDto })
  @ApiResponse({ status: 200, description: 'Status permohonan berhasil diubah.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak, bukan ADMIN.' })
  async verifyTrainer(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(verifyTrainerSchema)) body: z.infer<typeof verifyTrainerSchema>,
  ) {
    const result = await this.trainerRequestService.verifyTrainer(id, body.status);
    return { data: result, message: `Trainer request ${body.status.toLowerCase()}` };
  }
}
