import { Platform, Type, DateType } from '@mikro-orm/core';
import { TransformContext } from '@mikro-orm/core/types/Type';
import { MultiPolygon } from 'geojson';

export class MultiPolygonType extends Type<MultiPolygon, string> {
  convertToDatabaseValue(value: MultiPolygon): string {
    return JSON.stringify(value);
  }

  convertToJSValue(value: string): MultiPolygon {
    return JSON.parse(value);
  }

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
