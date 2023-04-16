import { Entity, Property, PrimaryKey, Index } from '@mikro-orm/core';
import { MultiPolygon } from 'geojson';
import { ZoningDistrictRepository } from './zoning_district.repository';
import { MultiPolygonType } from '../shared/MultiPolygonType';

@Entity({ customRepository: () => ZoningDistrictRepository })
@Index({
  name: 'zoning_district_geom_idx',
  expression:
    'CREATE INDEX zoning_district_geom_idx on zoning_district USING GIST (geom)',
})
export class ZoningDistrict {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid: string;

  // lazy arg doesn't seem to work with custom property types
  @Property({ type: MultiPolygonType, lazy: true })
  geom: MultiPolygon;

  @Property()
  district: string;

  constructor(district: string, multiPolygon: MultiPolygon) {
    this.district = district;
    this.geom = multiPolygon;
  }
}
