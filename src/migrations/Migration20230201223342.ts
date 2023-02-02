import { Migration } from '@mikro-orm/migrations';

export class Migration20230201223342 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "zoning_district" ("uuid" uuid not null default uuid_generate_v4(), "geom" geometry(MultiPolygon,3857) not null, "district" varchar(255) not null, constraint "zoning_district_pkey" primary key ("uuid"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "zoning_district" cascade;');
  }

}
