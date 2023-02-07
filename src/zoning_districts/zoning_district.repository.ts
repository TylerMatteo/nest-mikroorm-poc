import { EntityRepository } from '@mikro-orm/postgresql';
import { ZoningDistrict } from './zoning_district.entity';

export class ZoningDistrictRepository extends EntityRepository<ZoningDistrict> {
  public async findAllAsMvt(z: number, x: number, y: number) {
    console.log(z, x, y);
    const knex = this.getKnex();
    const qb = this.createQueryBuilder();
    // const subQb = this.createQueryBuilder().select(knex.raw(`ST_AsMVTGeom(geom, ST_TileEnvelope(?,?,?)) AS geom, uuid, district`, [z,x,y]));
    // const subQuery = knex
    //   .first(
    //     knex.raw(
    //       `ST_AsMVTGeom(geom, ST_TileEnvelope(?,?,?)) AS geom, uuid, district`,
    //       [z, x, y],
    //     ),
    //   )
    //   .whereRaw('ST_Intersects(geom, ST_TileEnvelope(?,?,?))', [z, x, y])
    //   .from('zoning_district');

    // const foo = knex
    //   .with('mvtgeom', subQuery)
    //   .first(knex.raw('ST_AsMVT(mvtgeom.*) as tile'))
    //   .from('mvtgeom');

    // console.log(foo.toQuery());
    // return foo;

    // return row;
    // const qb1 = knex('zoning_district')
    // knex.with(
    //   'mvtgeom',
    //   knex('zoning_district').select()
    // )
    // .select(knex.raw('ST_AsMVT(mvtgeom.*)')))

    // const sq = qb1.select

    return qb.raw(`SELECT ST_AsMVT(mvtgeom.*) as tile from (SELECT ST_AsMVTGeom(geom, ST_TileEnvelope(${z},${x},${y})) AS geom, uuid, district
    FROM zoning_district
    WHERE ST_IsValid(geom) IS TRUE AND ST_Intersects(geom, ST_TileEnvelope(${z},${x},${y}))) as mvtgeom`);
    // return qb.raw(`SELECT ST_AsMVT(mvtgeom.*) as tile from (
    //   SELECT ST_AsMVTGeom(geom, ST_TileEnvelope(${z},${x},${y})) AS geom, uuid, district FROM zoning_district WHERE ST_Intersects(geom, ST_TileEnvelope(${z},${x},${y}))
    //   ) as mvtgeom`);
    // return qb.raw(`WITH mvtgeom AS (
    //   SELECT ST_AsMVTGeom(geom, ST_TileEnvelope(${z},${x},${y})) AS geom, uuid, district
    //   FROM zoning_district
    //   WHERE ST_Intersects(geom, ST_TileEnvelope(${z},${x},${y}))
    // ) SELECT ST_AsMVT(mvtgeom.*) as tile from mvtgeom`);
  }
}
