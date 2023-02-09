import { Type } from '@mikro-orm/core';
// import { GeometryType } from './GeometryType';
import {
  Point,
  MultiPoint,
  LineString,
  MultiLineString,
  Polygon,
  MultiPolygon,
  GeometryCollection,
  Geometry,
} from 'geojson';

type Geometries =
  | MultiPolygon['type']
  | Point['type']
  | MultiPoint['type']
  | GeometryCollection['type']
  | Polygon['type']
  | MultiLineString['type']
  | LineString['type'];

export const GeometryId: Record<Geometries, Geometries> = {
  MultiPolygon: 'MultiPolygon',
  Point: 'Point',
  MultiPoint: 'Point',
  GeometryCollection: 'GeometryCollection',
  Polygon: 'Polygon',
  MultiLineString: 'MultiLineString',
  LineString: 'LineString',
} as const;

export class GeometryType<G extends Geometry> extends Type<G, string> {}

// export function createGeometryType<G extends Geometry>(
//   geometryType: Geometries,
// ): Type<G, string> {
//   return class GeometryType<G> {
//     convertToDatabaseValue(value: G): string {
//       return JSON.stringify(value);
//     }

//     convertToJSValue(value: string): G {
//       return JSON.parse(value);
//     }

//     convertToDatabaseValueSQL(key: string): string {
//       return `ST_Transform(ST_GeomFromGeoJSON(${key}),3857)`;
//     }

//     convertToJSValueSQL(key: string): string {
//       return `ST_AsGeoJSON(ST_Transform(${key}, 4326))`;
//     }

//     getColumnType() {
//       return `geometry(${geometryType},3857)`;
//     }
//   };
// }
