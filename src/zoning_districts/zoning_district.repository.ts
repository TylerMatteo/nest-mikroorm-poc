import { EntityRepository } from '@mikro-orm/postgresql';
import { ZoningDistrict } from './zoning_district.entity';

export class ZoningDistrictRepository extends EntityRepository<ZoningDistrict> {
  public findAllAsMvt(z: number, x: number, y: number) {
    const qb = this.createQueryBuilder();

    return qb.raw(`SELECT ST_AsMVT(mvtgeom.*) as tile from (SELECT ST_AsMVTGeom(geom, ST_TileEnvelope(${z},${x},${y})) AS geom, uuid, district
    FROM zoning_district
    WHERE ST_Intersects(geom, ST_TileEnvelope(${z},${x},${y}))) as mvtgeom`);
    // return qb.raw(`WITH mvtgeom AS (
    //   SELECT ST_AsMVTGeom(geom, ST_TileEnvelope(${z},${x},${y})) AS geom, uuid, district
    //   FROM zoning_district
    //   WHERE ST_Intersects(geom, ST_TileEnvelope(${z},${x},${y}))
    // ) SELECT ST_AsMVT(mvtgeom.*) as tile from mvtgeom`);
  }
}
