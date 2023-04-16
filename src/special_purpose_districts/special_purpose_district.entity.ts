import { Entity, Property, Index } from '@mikro-orm/core';
import { MultiPolygon } from 'geojson';
import { MultiPolygonEntity } from '../shared/MultiPolygonEntity';

@Index({
  name: 'special_purpose_districts_geom_idx',
  expression:
    'CREATE INDEX special_purpose_districts_geom_idx on special_purpose_districts USING GIST (geom)',
})
@Entity({ tableName: 'special_purpose_districts' })
export class SpecialPurposeDistrict extends MultiPolygonEntity {
  @Property()
  name: string;

  @Property()
  label: string;

  constructor(name: string, label: string, geom: MultiPolygon) {
    super();
    this.name = name;
    this.label = label;
    this.geom = geom;
  }
}
