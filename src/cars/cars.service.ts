import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CarRepository } from './car.repository';
import { Car } from './car.entity';
import { CreateCarDto } from './create-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: CarRepository,
  ) {}

  async findAll(): Promise<Car[]> {
    return this.carRepository.findAll();
  }

  async create(dto: CreateCarDto): Promise<void> {
    const car = new Car(dto.make, dto.model, dto.weight);

    await this.carRepository.persistAndFlush(car);
  }
}
