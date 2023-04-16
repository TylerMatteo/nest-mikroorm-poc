import { Entity, Property } from '@mikro-orm/core';
import { MultiPolygon } from 'geojson';
import { MultiPolygonEntity } from '../shared/MultiPolygonEntity';

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
