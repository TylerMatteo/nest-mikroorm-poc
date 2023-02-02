import { Test, TestingModule } from '@nestjs/testing';
import { ZoningDistrictsController } from './zoning_districts.controller';

describe('ZoningDistrictsController', () => {
  let controller: ZoningDistrictsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZoningDistrictsController],
    }).compile();

    controller = module.get<ZoningDistrictsController>(ZoningDistrictsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
