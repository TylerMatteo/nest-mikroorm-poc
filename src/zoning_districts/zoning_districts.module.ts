import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ZoningDistrictsController } from './zoning_districts.controller';
import { ZoningDistrictsService } from './zoning_districts.service';
import { ZoningDistrict } from './zoning_district.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [ZoningDistrict] })],
  exports: [ZoningDistrictsService],
  controllers: [ZoningDistrictsController],
  providers: [ZoningDistrictsService],
})
export class ZoningDistrictsModule {}
