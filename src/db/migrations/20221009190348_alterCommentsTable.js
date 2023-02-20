exports.up = function(knex) {
  return knex.schema.table("comments", (table) => {
    table.string("user_id").unsigned().notNullable();
    table.string("user_image").notNullable();
    table.integer("rating").unsigned()
    table.renameColumn("commenter_name", "display_name")
    table.renameColumn("comment_description", "body")
  })  
};

exports.down = function(knex) {
  return knex.schema.table("comments", (table) => {
    table.dropColumn("user_id")
    table.dropColumn("user_image")
    table.dropColumn("rating")
    table.renameColumn("display_name", "commenter_name")
    table.renameColumn("body", "comment_description")
  });
};
