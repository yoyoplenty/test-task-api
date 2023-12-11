import { Model } from 'mongoose';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { Sector, SectorDocument } from './schemas/sector.schema';
import { ObjectId } from 'mongodb';
import { MSG_TYPES } from 'src/utils/helpers/msg-types';
import { ServiceResponse } from 'src/utils/types';
import { SectorQueryDto } from './dto/sector-query.dto';

@Injectable()
export class SectorService {
  constructor(@InjectModel(Sector.name) private sector: Model<SectorDocument>) {}

  async createSector(createSectorPayload: CreateSectorDto): Promise<ServiceResponse> {
    const { parentSector = null, name } = createSectorPayload;

    const validParentSector = parentSector ? await this.sector.findOne({ _id: parentSector }) : null;
    if (parentSector && !validParentSector) throw new BadRequestException('invalid parent sector');

    const sector = await this.sector.findOne({ name, parentSector });
    if (sector) throw new ConflictException('sector name already in use');

    const data = await this.sector.create(createSectorPayload);

    return { data, message: MSG_TYPES.FETCHED };
  }

  async getSectors(query: SectorQueryDto): Promise<ServiceResponse> {
    const sectors = await this.sector.find(query);
    if (!sectors || sectors.length < 1) throw new NotFoundException('sectors not found');

    return { data: sectors, message: MSG_TYPES.FETCHED };
  }

  async getParentSectors(): Promise<ServiceResponse> {
    const sectors = await this.sector.find({ parentSector: { $exists: false, $eq: null } });

    return { data: sectors, message: MSG_TYPES.FETCHED };
  }

  async getAllSubSectors(query: SectorQueryDto): Promise<ServiceResponse> {
    const { parentSector = null } = query;
    delete query.parentSector;

    const filter = parentSector ? { parentSector } : { parentSector: { $exists: true, $ne: null } };
    const sectors = await this.sector.find({ ...query, ...filter });

    return { data: sectors, message: MSG_TYPES.FETCHED };
  }

  async getParentSectorsWithSubs(query: SectorQueryDto): Promise<ServiceResponse> {
    delete query.parentSector;

    const parentSectors = await this.sector.find({ ...query, parentSector: { $exists: false, $eq: null } });
    if (!parentSectors || parentSectors.length < 1) throw new NotFoundException('sectors not found');

    const data = await Promise.all(
      parentSectors.map(async (sector) => {
        const subSectors = await this.getSubSectors({ parentSector: sector._id });

        return { ...sector.toJSON(), subSectors };
      }),
    );

    return { data, message: MSG_TYPES.FETCHED };
  }

  async getSectorsWithSubs(query: SectorQueryDto): Promise<ServiceResponse> {
    delete query.parentSector;

    const parentSectors = await this.sector.find({ ...query, parentSector: { $exists: true, $ne: null } });
    if (!parentSectors || parentSectors.length < 1) throw new NotFoundException('sectors not found');

    const data = await Promise.all(
      parentSectors.map(async (sector) => {
        const subSectors = await this.getSubSectors({ parentSector: sector._id });

        return { ...sector.toJSON(), subSectors };
      }),
    );

    return { data, message: MSG_TYPES.FETCHED };
  }

  async getSubSectors(query: SectorQueryDto | Record<string, any>): Promise<any[]> {
    const { parentSector = null } = query;
    delete query.parentSector;

    const filter = parentSector ? { parentSector } : { parentSector: { $exists: true, $ne: null } };
    const subSectors = await this.sector.find({ ...query, ...filter });

    if (subSectors.length > 0) {
      const nestedSubSectors = await Promise.all(
        subSectors.map(async (subSector) => {
          const subSubSectors = await this.getSubSectors({ parentSector: new ObjectId(subSector._id) });

          return { ...subSector.toJSON(), subSectors: subSubSectors };
        }),
      );
      return nestedSubSectors;
    }

    return [];
  }

  async getSectorById(sectorId: ObjectId): Promise<ServiceResponse> {
    const sector = await this.sector.findById(sectorId);
    if (!sector) throw new NotFoundException('sector not found');

    return { data: sector, message: MSG_TYPES.FETCHED };
  }

  async getSector(query: SectorQueryDto): Promise<ServiceResponse> {
    const sector = await this.sector.findOne(query);
    if (!sector) throw new NotFoundException('sector not found');

    return { data: sector, message: MSG_TYPES.FETCHED };
  }

  async updateSector(sectorId: ObjectId, updateSectorPayload: UpdateSectorDto): Promise<ServiceResponse> {
    const sector = await this.sector.findOne({ _id: sectorId });
    if (!sector) throw new NotFoundException('sector not found');

    await this.sector.updateOne({ _id: sector._id }, updateSectorPayload);

    return { data: null, message: MSG_TYPES.UPDATED };
  }

  async deleteSector(sectorId: ObjectId): Promise<ServiceResponse> {
    const sector = await this.sector.findById(sectorId);
    if (!sector) throw new NotFoundException('sector not found');

    if (!sector.parentSector) await this.sector.deleteMany({ parentSector: sector._id });

    await this.sector.findByIdAndDelete(sector._id);

    return { data: null, message: MSG_TYPES.UPDATED };
  }
}
