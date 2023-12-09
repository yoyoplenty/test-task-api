import { Test, TestingModule } from '@nestjs/testing';
import { UserSectorController } from '../user-sector.controller';
import { UserSectorService } from '../user-sector.service';

describe('UserSectorController', () => {
  let controller: UserSectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSectorController],
      providers: [UserSectorService],
    }).compile();

    controller = module.get<UserSectorController>(UserSectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
