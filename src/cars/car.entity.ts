import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Car {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid: string;

  @Property()
  make: string;

  @Property()
  model: string;

  @Property()
  weight: number;

  constructor(make: string, model: string, weight: number) {
    this.make = make;
    this.model = model;
    this.weight = weight;
  }
}
