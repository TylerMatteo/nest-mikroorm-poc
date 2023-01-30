import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [MikroOrmModule.forRoot(), CarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
