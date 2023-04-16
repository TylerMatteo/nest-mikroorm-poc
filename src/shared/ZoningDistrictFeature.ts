import { Feature, FeatureCollection } from 'geojson';
import { ZoningDistrict } from '../zoning_districts/zoning_district.entity';

export interface ZoningDistrictProperties
  extends Omit<ZoningDistrict, 'geom'> {}
export interface ZoningDistrictFeature
  extends Feature<ZoningDistrict['geom'], ZoningDistrictProperties> {}
export interface ZoningDistrictFeatureCollection
  extends FeatureCollection<ZoningDistrict['geom'], ZoningDistrictProperties> {}
