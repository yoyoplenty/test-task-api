import { Controller, Get, Body, Patch, Delete, UseGuards, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { ResponseDTO } from 'src/utils/types';
import { User } from 'src/decorators/user.decorator';
import { Response } from 'express';
import { ErrorResponse, JsonResponse } from 'src/handlers/responses';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user profile',
    description: 'Allows users get their profile',
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() user, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.userService.findUserProfile(user);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Edit user profile',
    description: 'Allows users edit their profile',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async editProfile(
    @Body() editProfilePayload: UpdateUserDto,
    @User() user,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.userService.editProfile(user, editProfilePayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete account',
    description: 'Allows users delete their account',
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteAccount(@User() user, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.userService.deleteAccount(user._id);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
