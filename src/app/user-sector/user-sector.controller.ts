import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSectorService } from './user-sector.service';
import { CreateUserSectorDto } from './dto/create-user-sector.dto';
import { UpdateUserSectorDto } from './dto/update-user-sector.dto';

@Controller('user-sector')
export class UserSectorController {
  constructor(private readonly userSectorService: UserSectorService) {}

  @Post()
  create(@Body() createUserSectorDto: CreateUserSectorDto) {
    return this.userSectorService.create(createUserSectorDto);
  }

  @Get()
  findAll() {
    return this.userSectorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSectorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSectorDto: UpdateUserSectorDto) {
    return this.userSectorService.update(+id, updateUserSectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSectorService.remove(+id);
  }
}
