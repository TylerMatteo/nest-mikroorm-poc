import { Migration } from '@mikro-orm/migrations';

export class Migration20230130220924 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "car" ("uuid" uuid not null default uuid_generate_v4(), "make" varchar(255) not null, "model" varchar(255) not null, "weight" int not null, constraint "car_pkey" primary key ("uuid"));');
  }

}
