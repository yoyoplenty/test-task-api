import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { SectorService } from './sector.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { ResponseDTO } from 'src/utils/types';
import { ErrorResponse, JsonResponse } from 'src/handlers/responses';

@ApiTags('Sector')
@Controller('api/v1/sectors')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorService.create(createSectorDto);
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectorDto: UpdateSectorDto) {
    return this.sectorService.update(+id, updateSectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectorService.remove(+id);
  }
}
