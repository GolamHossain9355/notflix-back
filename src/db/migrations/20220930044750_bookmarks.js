exports.up = function (knex) {
  return knex.schema.createTable("bookmarks", (table) => {
    table.string("user_id").unsigned().notNullable();

    table.integer("media_id").unsigned().notNullable();
    table
      .foreign("media_id")
      .references("media_id")
      .inTable("media")
      .onDelete("cascade");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("bookmarks");
};
