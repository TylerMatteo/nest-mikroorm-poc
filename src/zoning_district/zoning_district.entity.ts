import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { MultiPolygon } from 'geojson';
import { MultiPolygonType } from '../types/MultiPolygonType';

@Entity()
export class ZoningDistrict {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid: string;

  @Property({ type: MultiPolygonType })
  geom: MultiPolygon;

  @Property()
  district: string;

  constructor(district: string, multiPolygon: MultiPolygon) {
    this.district = district;
    this.geom = multiPolygon;
  }
}
