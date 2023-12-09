import { Module } from '@nestjs/common';
import { UserSectorService } from './user-sector.service';
import { UserSectorController } from './user-sector.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSector, UserSectorSchema } from './schemas/user-sector.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserSector.name, schema: UserSectorSchema }])],
  controllers: [UserSectorController],
  providers: [UserSectorService],
  exports: [UserSectorService],
})
export class UserSectorModule {}
