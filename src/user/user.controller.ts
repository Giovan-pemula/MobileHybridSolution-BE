import {
  Controller, Get, Patch, Delete, Param, Body, Query, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { updateUserSchema } from '../validations/user.validation';
import { z } from 'zod';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('ADMIN')
  async getUsers(@Query() query: { page?: string; limit?: string }) {
    const result = await this.userService.getAllUsers(query);
    return { data: result, message: 'Users fetched successfully' };
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id);
    return { data: user, message: 'User fetched successfully' };
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateUserSchema)) body: z.infer<typeof updateUserSchema>,
  ) {
    const user = await this.userService.updateUser(id, body);
    return { data: user, message: 'User updated successfully' };
  }

  @Delete(':id')
  @Roles('ADMIN')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
    return { data: null, message: 'User deleted successfully' };
  }
}
