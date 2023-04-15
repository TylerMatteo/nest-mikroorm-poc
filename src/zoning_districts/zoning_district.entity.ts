import { Entity, Property, PrimaryKey, Index } from '@mikro-orm/core';
import { MultiPolygon, Feature } from 'geojson';
import { ZoningDistrictRepository } from './zoning_district.repository';
import { MultiPolygonType } from '../types/MultiPolygonType';

@Entity({ customRepository: () => ZoningDistrictRepository })
@Index({
  name: 'zoning_district_geom_idx',
  expression:
    'CREATE INDEX zoning_district_geom_idx on zoning_district USING GIST (geom)',
})
export class ZoningDistrict {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid: string;

  // lazy arg doesn't seem to work with custom property types
  @Property({ type: MultiPolygonType, lazy: true })
  geom: MultiPolygon;

  @Property()
  district: string;

  constructor(district: string, multiPolygon: MultiPolygon) {
    this.district = district;
    this.geom = multiPolygon;
  }
}

// let foo: ZoningDistrictFeature = {
//   type: 'Feature',
//   geometry: {
//     type: 'MultiPolygon',
//     coordinates: [
//       [
//         [
//           [-74.010500301, 40.627692797],
//           [-74.010014028, 40.628161376],
//           [-74.009620811, 40.627917297],
//           [-74.008929598, 40.628565618],
//           [-74.008761118, 40.628463877],
//           [-74.00876124, 40.626540668],
//           [-74.008768357, 40.626533969],
//           [-74.009340398, 40.626533959],
//           [-74.009370772, 40.626552369],
//           [-74.010789092, 40.627415152],
//           [-74.010500301, 40.627692797],
//         ],
//       ],
//       [
//         [
//           [-75.008786465, 40.626516928],
//           [-74.009340398, 40.626533959],
//           [-74.008992452, 40.62632307],
//           [-75.008786465, 40.626516928],
//         ],
//       ],
//       [
//         [
//           [-74.008697388, 41.626602098],
//           [-74.007533022, 41.627722257],
//           [-74.007533022, 40.627722257],
//           [-74.008761118, 40.628463877],
//           [-74.008697388, 41.626602098],
//         ],
//       ],
//     ],
//   },
//   properties: {
//     district: 'R6',
//     uuid: 'asdf-lkj',
//   },
// };
