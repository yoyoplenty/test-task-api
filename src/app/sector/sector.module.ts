import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SectorService } from './sector.service';
import { SectorController } from './sector.controller';
import { Sector, SectorSchema } from './schemas/sector.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Sector.name, schema: SectorSchema }])],
  controllers: [SectorController],
  providers: [SectorService],
  exports: [SectorService],
})
export class SectorModule {}
