import { EntityRepository } from '@mikro-orm/postgresql';
import { ZoningDistrict } from './zoning_district.entity';
import { ZoningDistrictFeatureCollection } from '../types/ZoningDistrictFeature';

export class ZoningDistrictRepository extends EntityRepository<ZoningDistrict> {
  public async findAllAsGeojson(): Promise<ZoningDistrictFeatureCollection> {
    const qb = this.createQueryBuilder();
    const result = await qb.raw(`SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(features.feature)
  ) as data
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'id',         uuid,
      'geometry',   ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb,
      'properties', to_jsonb(inputs) - 'geom'
    ) AS feature
    FROM (SELECT * FROM zoning_district LIMIT 5) inputs) features;`);

    const { data } = result.rows[0];
    return new Promise<ZoningDistrictFeatureCollection>((resolve) => {
      resolve(data);
    });
  }
  public async findAllAsMvt(z: number, x: number, y: number) {
    console.log(z, x, y);
    const knex = this.getKnex();
    const qb = this.createQueryBuilder();

    return qb.raw(`SELECT ST_AsMVT(mvtgeom.*) as tile from (
      SELECT ST_AsMVTGeom(geom, ST_TileEnvelope(${z},${x},${y})) AS geom, uuid, district FROM zoning_district WHERE ST_Intersects(geom, ST_TileEnvelope(${z},${x},${y}))
      ) as mvtgeom`);
  }
}
