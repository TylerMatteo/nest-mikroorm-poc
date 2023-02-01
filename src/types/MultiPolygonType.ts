import { Type } from '@mikro-orm/core';

export class MultiPolygonType extends Type {
  convertToDatabaseValueSQL(key: string): string {
    return `ST_GeomFromGeoJSON(${key})`;
  }

  convertToJSValueSQL(key: string): string {
    return `ST_AsGeoJSON(ST_Transform(${key}, 4326))`;
  }

  getColumnType() {
    return `geometry(MultiPolygon,3857)`;
  }
}
