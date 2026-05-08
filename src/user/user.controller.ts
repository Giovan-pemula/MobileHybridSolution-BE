import {
  Controller, Get, Patch, Delete, Param, Body, Query, ParseIntPipe,
  UseGuards, UseInterceptors, UploadedFile, ForbiddenException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { updateProfileSchema, updateUserSchema } from './user.validation';
import { imageUploadOptions } from '../common/multer/multer.config';
import { z } from 'zod';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // --- ADMIN ROUTES ---

  @Get()
  @Roles('ADMIN')
  async getUsers(@Query() query: { page?: string; limit?: string }) {
    const result = await this.userService.getAllUsers(query);
    return { data: result, message: 'Users fetched successfully' };
  }

  @Get('profile')
  async getProfile(@CurrentUser() currentUser: CurrentUserPayload) {
    const user = await this.userService.getUserById(currentUser.id);
    return { data: user, message: 'Profile fetched successfully' };
  }

  @Patch('profile')
  async updateProfile(
    @Body(new ZodValidationPipe(updateProfileSchema)) body: z.infer<typeof updateProfileSchema>,
    @CurrentUser() currentUser: CurrentUserPayload,
  ) {
    const user = await this.userService.updateProfile(currentUser.id, body);
    return { data: user, message: 'Profile updated successfully' };
  }

  @Patch('profile/avatar')
  @UseInterceptors(FileInterceptor('avatar', imageUploadOptions()))
  async uploadProfileAvatar(
    @CurrentUser() currentUser: CurrentUserPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updated = await this.userService.uploadAvatar(currentUser.id, file);
    return { data: updated, message: 'Avatar uploaded successfully' };
  }

  @Get(':id')
  async getPublicProfile(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: CurrentUserPayload,
  ) {
    const user = await this.userService.getPublicProfile(id);
    return { data: user, message: 'User fetched successfully' };
  }

  @Patch(':id')
  @Roles('ADMIN')
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
  async uploadAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updated = await this.userService.uploadAvatar(id, file);
    return { data: updated, message: 'Avatar uploaded successfully' };
  }

  @Delete(':id')
  @Roles('ADMIN')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.userService.deleteUser(id);
    return { data: deleted, message: `User "${deleted.name}" deleted successfully` };
  }
}
