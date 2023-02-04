import { Migration } from '@mikro-orm/migrations';

export class Migration20230204174431 extends Migration {

  async up(): Promise<void> {
    this.addSql('CREATE INDEX zoning_district_geom_idx on zoning_district USING GIST (geom);');
  }

  async down(): Promise<void> {
    this.addSql('drop index "zoning_district_geom_idx";');
  }

}
