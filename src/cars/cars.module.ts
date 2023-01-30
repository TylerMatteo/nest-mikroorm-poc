import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from './car.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Car] })],
  exports: [CarsService],
  providers: [CarsService],
  controllers: [CarsController],
})
export class CarsModule {}
