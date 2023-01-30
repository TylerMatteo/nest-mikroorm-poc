import { Controller, Get, Post, Body } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  health(): string {
    return 'it works';
  }

  @Post()
  async create(@Body() carData: CreateCarDto) {
    return this.carService.create(carData);
  }
}
