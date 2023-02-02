import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { ZoningDistrictsModule } from './zoning_districts/zoning_districts.module';

@Module({
  imports: [MikroOrmModule.forRoot(), CarsModule, ZoningDistrictsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
