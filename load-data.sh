# Load Admin 0 countries
docker-compose exec postgres sh -c "shp2pgsql -a -D -s 3857 /work/cleaned_zoning_districts.shp zoning_district | psql -U foo -d test"

# Load Vancouver Water Hydrants
# docker-compose exec pg_tileserv_db sh -c "shp2pgsql -D -s 26910 -I /work/water-hydrants.shp hydrants | psql -U tileserv -d tileserv"

# Load SQL Functions for OpenLayers example
# cp ../openlayers/openlayers-function-click.sql ./data/
# docker-compose exec pg_tileserv_db sh -c "cat /work/openlayers-function-click.sql | psql -U tileserv -d tileserv"
# rm ./data/openlayers-function-click.sql
