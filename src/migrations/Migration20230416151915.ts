import { Migration } from '@mikro-orm/migrations';

export class Migration20230416151915 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "special_purpose_districts" ("uuid" uuid not null default uuid_generate_v4(), "geom" geometry(MultiPolygon,3857) not null, "name" varchar(255) not null, "label" varchar(255) not null, constraint "special_purpose_districts_pkey" primary key ("uuid"));');
    this.addSql('CREATE INDEX special_purpose_districts_geom_idx on special_purpose_districts USING GIST (geom);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "special_purpose_districts" cascade;');
  }

}
