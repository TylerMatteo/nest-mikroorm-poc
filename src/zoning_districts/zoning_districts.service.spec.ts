import { Test, TestingModule } from '@nestjs/testing';
import { ZoningDistrictsService } from './zoning_districts.service';

describe('ZoningDistrictsService', () => {
  let service: ZoningDistrictsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZoningDistrictsService],
    }).compile();

    service = module.get<ZoningDistrictsService>(ZoningDistrictsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
