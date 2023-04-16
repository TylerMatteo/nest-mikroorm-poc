import { Property, PrimaryKey } from '@mikro-orm/core';
import { MultiPolygon } from 'geojson';
import { MultiPolygonType } from './MultiPolygonType';

export abstract class MultiPolygonEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid: string;

  @Property({ type: MultiPolygonType })
  geom: MultiPolygon;
}
