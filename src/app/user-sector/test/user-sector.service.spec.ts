import { Test, TestingModule } from '@nestjs/testing';
import { UserSectorService } from '../user-sector.service';

describe('UserSectorService', () => {
  let service: UserSectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSectorService],
    }).compile();

    service = module.get<UserSectorService>(UserSectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
