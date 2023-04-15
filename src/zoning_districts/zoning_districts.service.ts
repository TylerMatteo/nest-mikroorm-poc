import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ZoningDistrictRepository } from './zoning_district.repository';
import { ZoningDistrict } from './zoning_district.entity';
import { CreateZoningDistrictDto } from './createZoningDistrict.dto';
import { ZoningDistrictFeatureCollection } from '../types/ZoningDistrictFeature';

@Injectable()
export class ZoningDistrictsService {
  constructor(
    @InjectRepository(ZoningDistrict)
    private readonly zoningDistrictRepository: ZoningDistrictRepository,
  ) {}

  async findAllAsMvt(z: number, x: number, y: number) {
    return this.zoningDistrictRepository.findAllAsMvt(z, x, y);
  }

  async findAll(): Promise<ZoningDistrict[]> {
    return this.zoningDistrictRepository.findAll({ limit: 5 });
  }

  async findAllAsGeojson(): Promise<ZoningDistrictFeatureCollection> {
    return this.zoningDistrictRepository.findAllAsGeojson();
  }

  async create(dto: CreateZoningDistrictDto): Promise<void> {
    const zoningDistrict = new ZoningDistrict(dto.district, dto.geom);

    await this.zoningDistrictRepository.persistAndFlush(zoningDistrict);
  }
}
