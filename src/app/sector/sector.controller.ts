import { SectorQueryDto } from './dto/sector-query.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { SectorService } from './sector.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { ResponseDTO } from 'src/utils/types';
import { ErrorResponse, JsonResponse } from 'src/handlers/responses';
import { Roles } from 'src/decorators/roles.decorator';
import { ObjectId } from 'mongodb';

@ApiTags('Sector')
@Controller('api/v1/sectors')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Admin create sector',
    description: 'Allows admin create a new sector',
  })
  // @Roles('admin')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async createSector(@Body() createSectorPayload: CreateSectorDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.sectorService.createSector(createSectorPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiOperation({ summary: 'Get all sectors' })
  @Get()
  async getSectors(@Query() query: SectorQueryDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.sectorService.getSectors(query);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Users Gets all parent sectors',
    description: 'Allows users get all parent sectors',
  })
  // @UseGuards(JwtAuthGuard)
  @Get('parent')
  async getParentSectors(@Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.sectorService.getParentSectors();

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Users Gets all sub sectors',
    description: 'Allows users get all sub sectors',
  })
  // @UseGuards(JwtAuthGuard)
  @Get('sub')
  async getSubSectors(@Query() query: SectorQueryDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.sectorService.getAllSubSectors(query);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Gets sectors with the sub sectors',
    description: 'Allows users get sectors with their sub sectors',
  })
  // @UseGuards(JwtAuthGuard)
  @Get('parent-sub')
  async getSectorsWithSubs(@Query() query: SectorQueryDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.sectorService.getSectorsWithSubs(query);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Admin update sector',
    description: 'Allows admin update a sector',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateSector(
    @Param('id') id: string,
    @Body() updateSectorPayload: UpdateSectorDto,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.sectorService.updateSector(new ObjectId(id), updateSectorPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Admin delete sector',
    description: 'Allows admin delete a sector',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteSector(@Param('id') id: string, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.sectorService.deleteSector(new ObjectId(id));

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
