import { Type } from '@mikro-orm/core';
import { GeometryId } from './createGeometryType';
import { MultiPolygon, Point } from 'geojson';

export class PointType extends Type<Point, string> {
  convertToDatabaseValue(value: Point): string {
    return JSON.stringify(value);
  }

  convertToJSValue(value: string): Point {
    return JSON.parse(value);
  }

  convertToDatabaseValueSQL(key: string): string {
    return `ST_Transform(ST_GeomFromGeoJSON(${key}),3857)`;
  }

  convertToJSValueSQL(key: string): string {
    return `ST_AsGeoJSON(ST_Transform(${key}, 4326))`;
  }

  getColumnType() {
    return `geometry(${GeometryId.Point},3857)`;
  }
}
