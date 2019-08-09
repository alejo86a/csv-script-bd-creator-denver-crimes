exports.up = knex => knex.schema
  .createTable('crimes', (table) => {
    table.string('OFFENSE_ID', 255).notNullable();
    table.string('OFFENSE_CODE', 255).notNullable();
    table.string('OFFENSE_CODE_EXTENSION', 255).notNullable();
    table.string('OFFENSE_TYPE_ID', 255).notNullable();
    table.string('OFFENSE_CATEGORY_ID', 255).notNullable();
    table.string('FIRST_OCCURRENCE_DATE', 255).notNullable();
    table.string('LAST_OCCURRENCE_DATE', 255).notNullable();
    table.string('REPORTED_DATE', 255).notNullable();
    table.string('INCIDENT_ADDRESS', 255);
    table.string('GEO_X', 255).notNullable();
    table.string('GEO_Y', 255).notNullable();
    table.string('GEO_LON', 255).notNullable();
    table.string('GEO_LAT', 255).notNullable();
    table.string('DISTRICT_ID', 255).notNullable();
    table.string('PRECINCT_ID', 255).notNullable();
    table.string('NEIGHBORHOOD_ID', 255).notNullable();
    table.string('IS_CRIME', 255).notNullable();
    table.string('IS_TRAFFIC', 255).notNullable();
  });
exports.down = knex => knex.schema.dropTable('crimes');
