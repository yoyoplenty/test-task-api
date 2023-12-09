import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Query } from '@nestjs/common';
import { UserSectorService } from './user-sector.service';
import { CreateUserSectorDto } from './dto/create-user-sector.dto';
import { UpdateUserSectorDto } from './dto/update-user-sector.dto';
import { ErrorResponse, JsonResponse } from 'src/handlers/responses';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { ResponseDTO } from 'src/utils/types';
import { UserSectorQueryDto } from './dto/user-sector-query.dto';
import { User } from 'src/decorators/user.decorator';

@ApiTags('User Sector')
@Controller('api/v1/user-sectors')
export class UserSectorController {
  constructor(private readonly userSectorService: UserSectorService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User creates its sector',
    description: 'Allows user creates its sector',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createUserSector(
    @Body() createUserSectorPayload: CreateUserSectorDto,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.userSectorService.createUserSector(createUserSectorPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Users Gets all user Sectors',
    description: 'Allows users get all userSector',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserSectors(@Query() query: UserSectorQueryDto, @User() user, @Res() res: Response): Promise<ResponseDTO> {
    try {
      query['user'] = user._id;

      const response = await this.userSectorService.getUserSectors(query);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a single userSector',
    description: 'Allows users get a userSector',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUserSector(@Param('id') id: string, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.userSectorService.getUserSectorById(id);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User update userSector',
    description: 'Allows user update a userSector',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateUserSector(
    @Param('id') id: string,
    @Body() updateUserSectorPayload: UpdateUserSectorDto,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.userSectorService.updateUserSector(id, updateUserSectorPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User delete userSector',
    description: 'Allows user delete a userSector',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteUserSector(@Param('id') id: string, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.userSectorService.deleteUserSector(id);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
