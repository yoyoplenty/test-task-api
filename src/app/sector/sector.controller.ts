import { SectorQueryDto } from './dto/sector-query.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { SectorService } from './sector.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { ResponseDTO } from 'src/utils/types';
import { ErrorResponse, JsonResponse } from 'src/handlers/responses';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Sector')
@Controller('api/v1/sectors')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Admin create sector',
    description: 'Allows admin create a new sector',
  })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
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
  async getSectors(@Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.sectorService.findAll();

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
  @UseGuards(JwtAuthGuard)
  @Get('sub')
  async getSubSectors(@Query() query: SectorQueryDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const filter = requestFilter(query);

      const response = await this.sectorService.getSubSectors(filter);

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
  @UseGuards(JwtAuthGuard)
  @Get('parent-sub')
  async getSectorsWithSubs(@Query() query: SectorQueryDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.sectorService.getSectorsWithSubs(SectorQueryDto);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
