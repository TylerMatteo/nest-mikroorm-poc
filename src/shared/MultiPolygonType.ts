import { Type } from '@mikro-orm/core';
import { GeometryId } from './createGeometryType';
import { MultiPolygon } from 'geojson';

// TODO - How do we handle this "convertTo" methods failing?
// see https://github.com/darkbasic/mikro4-geog-repro/blob/master/src/mikro-orm/types/Geography.ts
export class MultiPolygonType extends Type<MultiPolygon, string> {
  convertToDatabaseValue(value: MultiPolygon): string {
    return JSON.stringify(value);
  }

  convertToJSValue(value: string): MultiPolygon {
    return JSON.parse(value);
  }

  convertToDatabaseValueSQL(key: string): string {
    return `ST_Transform(ST_GeomFromGeoJSON(${key}),3857)`;
  }

  convertToJSValueSQL(key: string): string {
    return `ST_AsGeoJSON(ST_Transform(${key}, 4326))`;
  }

  getColumnType() {
    return `geometry(${GeometryId.MultiPolygon},3857)`;
  }
}
