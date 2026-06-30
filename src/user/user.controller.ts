import {
  Controller, Get, Patch, Delete, Param, Body, Query, ParseIntPipe,
  UseGuards, UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse,
  ApiParam, ApiQuery, ApiConsumes, ApiBody, ApiProperty,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { updateProfileSchema, updateUserSchema } from './user.validation';
import { imageUploadOptions } from '../common/multer/multer.config';
import { z } from 'zod';

class UpdateProfileDto {
  @ApiProperty({ example: 'John Doe', required: false })     name?: string;
  @ApiProperty({ example: '08123456789', required: false })  phone?: string;
  @ApiProperty({ example: 'Jakarta', required: false })      city?: string;
}

class UpdateUserDto {
  @ApiProperty({ example: 'TRAINER', enum: ['USER', 'TRAINER', 'ADMIN'], required: false }) role?: string;
  @ApiProperty({ example: 'John Doe', required: false }) name?: string;
}

class UploadAvatarDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'File gambar avatar' })
  avatar: any;
}

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: '[ADMIN] Ambil semua pengguna' })
  @ApiQuery({ name: 'page', required: false, example: '1' })
  @ApiQuery({ name: 'limit', required: false, example: '10' })
  @ApiResponse({ status: 200, description: 'Daftar pengguna berhasil diambil.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak, bukan ADMIN.' })
  async getUsers(@Query() query: { page?: string; limit?: string }) {
    const result = await this.userService.getAllUsers(query);
    return { data: result, message: 'Users fetched successfully' };
  }

  @Get('profile')
  @ApiOperation({ summary: 'Ambil profil pengguna yang sedang login' })
  @ApiResponse({ status: 200, description: 'Profil berhasil diambil.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async getProfile(@CurrentUser() currentUser: CurrentUserPayload) {
    const user = await this.userService.getUserById(currentUser.id);
    return { data: user, message: 'Profile fetched successfully' };
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update profil pengguna yang sedang login' })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ status: 200, description: 'Profil berhasil diperbarui.' })
  async updateProfile(
    @Body(new ZodValidationPipe(updateProfileSchema)) body: z.infer<typeof updateProfileSchema>,
    @CurrentUser() currentUser: CurrentUserPayload,
  ) {
    const user = await this.userService.updateProfile(currentUser.id, body);
    return { data: user, message: 'Profile updated successfully' };
  }

  @Patch('profile/avatar')
  @UseInterceptors(FileInterceptor('avatar', imageUploadOptions()))
  @ApiOperation({ summary: 'Upload avatar pengguna yang sedang login', description: 'Gunakan `multipart/form-data` dengan field bernama `avatar`.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadAvatarDto })
  @ApiResponse({ status: 200, description: 'Avatar berhasil diupload.' })
  async uploadProfileAvatar(
    @CurrentUser() currentUser: CurrentUserPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updated = await this.userService.uploadAvatar(currentUser.id, file);
    return { data: updated, message: 'Avatar uploaded successfully' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil profil publik pengguna berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID pengguna' })
  @ApiResponse({ status: 200, description: 'Data pengguna berhasil diambil.' })
  @ApiResponse({ status: 404, description: 'Pengguna tidak ditemukan.' })
  async getPublicProfile(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: CurrentUserPayload,
  ) {
    const user = await this.userService.getPublicProfile(id);
    return { data: user, message: 'User fetched successfully' };
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[ADMIN] Update data pengguna berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID pengguna' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Data pengguna berhasil diperbarui.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak.' })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateUserSchema)) body: z.infer<typeof updateUserSchema>,
  ) {
    const user = await this.userService.updateUser(id, body);
    return { data: user, message: 'User updated successfully' };
  }

  @Patch(':id/avatar')
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('avatar', imageUploadOptions()))
  @ApiOperation({ summary: '[ADMIN] Upload avatar pengguna tertentu' })
  @ApiParam({ name: 'id', description: 'ID pengguna' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadAvatarDto })
  @ApiResponse({ status: 200, description: 'Avatar berhasil diupload.' })
  async uploadAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updated = await this.userService.uploadAvatar(id, file);
    return { data: updated, message: 'Avatar uploaded successfully' };
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: '[ADMIN] Hapus akun pengguna berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID pengguna' })
  @ApiResponse({ status: 200, description: 'Pengguna berhasil dihapus.' })
  @ApiResponse({ status: 404, description: 'Pengguna tidak ditemukan.' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.userService.deleteUser(id);
    return { data: deleted, message: `User "${deleted.name}" deleted successfully` };
  }
}
