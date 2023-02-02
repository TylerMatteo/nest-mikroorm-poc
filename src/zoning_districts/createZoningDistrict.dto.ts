import { MultiPolygon } from 'geojson';

export class CreateZoningDistrictDto {
  district: string;
  geom: MultiPolygon;
}
