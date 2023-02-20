exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("comment_id").primary();

    table.integer("media_id").unsigned();
    table
      .foreign("media_id")
      .references("media_id")
      .inTable("media")
      .onDelete("cascade");

    table.string("commenter_name");
    table.text("comment_description");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
