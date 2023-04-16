import { Type } from '@mikro-orm/core';
import { Geometry } from 'geojson';

export abstract class GeometryType<G extends Geometry> extends Type<G, string> {
  convertToDatabaseValue(value: G): string {
    return JSON.stringify(value);
  }

  convertToJSValue(value: string): G {
    return JSON.parse(value);
  }

  convertToDatabaseValueSQL(key: string): string {
    return `ST_Transform(ST_GeomFromGeoJSON(${key}),3857)`;
  }

  convertToJSValueSQL(key: string): string {
    return `ST_AsGeoJSON(ST_Transform(${key}, 4326))`;
  }

  getColumnType() {
    return `geometry(MultiPolygon,3857)`;
  }
}
