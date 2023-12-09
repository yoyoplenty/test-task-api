import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { Sector, SectorDocument } from './schemas/sector.schema';

@Injectable()
export class SectorService {
  constructor(@InjectModel(Sector.name) private sector: Model<SectorDocument>) {}

  create(createSectorDto: CreateSectorDto) {
    return 'This action adds a new sector';
  }

  findAll() {
    return `This action returns all sector`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sector`;
  }

  update(id: number, updateSectorDto: UpdateSectorDto) {
    return `This action updates a #${id} sector`;
  }

  remove(id: number) {
    return `This action removes a #${id} sector`;
  }
}
