import { EntityRepository } from '@mikro-orm/postgresql';
import { Car } from './car.entity';

export class CarRepository extends EntityRepository<Car> {}
