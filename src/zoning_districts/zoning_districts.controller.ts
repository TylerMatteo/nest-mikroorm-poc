import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Header,
  Res,
} from '@nestjs/common';
import { CreateZoningDistrictDto } from './createZoningDistrict.dto';
import { ZoningDistrictsService } from './zoning_districts.service';

@Controller('zoning-districts')
export class ZoningDistrictsController {
  constructor(private readonly zoningDistrictService: ZoningDistrictsService) {}

  @Get()
  async findAll() {
    return this.zoningDistrictService.findAll();
  }

  @Get(':z/:x/:y.pbf')
  @Header('Content-Type', 'application/x-protobuf')
  async findAllAsMvt(@Param() params, @Res() response) {
    console.log(`Getting tile for ${params.z}, ${params.x}, ${params.y}`);
    console.log(typeof params.z);
    const result = await this.zoningDistrictService.findAllAsMvt(
      parseInt(params.z),
      parseInt(params.x),
      parseInt(params.y),
    );
    console.log(
      `Finished getting tile for ${params.z}, ${params.x}, ${params.y}`,
    );
    response.send(result.rows[0].tile);
  }

  @Post()
  async create(@Body() zoningDistrictData: CreateZoningDistrictDto) {
    return this.zoningDistrictService.create(zoningDistrictData);
  }
}
