import { Buffer } from 'node:buffer';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Header,
  Res,
  CACHE_MANAGER,
  Inject,
  Req,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CreateZoningDistrictDto } from './createZoningDistrict.dto';
import { ZoningDistrictsService } from './zoning_districts.service';

@Controller('zoning-districts')
export class ZoningDistrictsController {
  constructor(
    private readonly zoningDistrictService: ZoningDistrictsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async findAll() {
    // return this.zoningDistrictService.findAll();
    return this.zoningDistrictService.findAllAsGeojson();
  }

  @Get()
  async find() {
    return this.zoningDistrictService.findAll();
  }

  // @Get(':z/:x/:y.pbf')
  // @Header('Content-Type', 'application/x-protobuf')
  // async findAllAsMvt(@Param() params, @Res() response) {
  //   const result = await this.zoningDistrictService.findAllAsMvt(
  //     parseInt(params.z),
  //     parseInt(params.x),
  //     parseInt(params.y),
  //   );
  //   const tile = result.rows[0].tile;
  //   response.send(tile);
  // }

  @Get(':z/:x/:y.pbf')
  @Header('Content-Type', 'application/x-protobuf')
  async findAllAsMvt(@Param() params, @Req() request, @Res() response) {
    // console.log('URL', request.url);
    const allKeys = await this.cacheManager.store.keys();
    console.log('CURRENT KEYS', allKeys);
    // const cacheKey = `tile-${params.z}-${params.x}-${params.y}`;
    const cacheKey = request.url;
    console.log('LOOKING UP KEY', cacheKey);
    const cachedTile = (await this.cacheManager.get(cacheKey)) as string;
    console.log('FOUND VALUE TYPE', typeof cachedTile);

    if (typeof cachedTile !== 'undefined' && cachedTile !== null) {
      console.log(
        `FOUND CACHED TILE FOR ${params.z}, ${params.x}, ${params.y}`,
      );
      const cachedTileAsJson = JSON.parse(cachedTile);
      response.send(Buffer.from(cachedTileAsJson));
      return;
    }
    console.log(
      `DID NOT FIND CACHED TILE FOR ${params.z}, ${params.x}, ${params.y}`,
    );
    console.log(`Getting tile for ${params.z}, ${params.x}, ${params.y}`);
    const result = await this.zoningDistrictService.findAllAsMvt(
      parseInt(params.z),
      parseInt(params.x),
      parseInt(params.y),
    );
    const tile = result.rows[0].tile;
    const tileAsJson = JSON.stringify(tile);
    console.log(
      `Finished getting tile for ${params.z}, ${params.x}, ${params.y}`,
    );
    // console.log('tile as json', JSON.stringify(tile));
    // console.log('IS BUFFER', Buffer.isBuffer(result.rows[0].tile));
    await this.cacheManager.set(cacheKey, tileAsJson, 0);
    response.send(tile);
    // response.send(result.rows[0].tile);
  }

  @Post()
  async create(@Body() zoningDistrictData: CreateZoningDistrictDto) {
    return this.zoningDistrictService.create(zoningDistrictData);
  }
}
