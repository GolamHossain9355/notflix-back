const knex = require("../db/connections");

function listComments(media_id) {
  return knex("comments").where({ media_id });
}

function create(media_id, newData) {
  return knex("comments")
    .where({ media_id })
    .insert(newData)
    .returning("*")
    .then((data) => data[0]);
}

function read(comment_id) {
  return knex("comments").where({ comment_id });
}

function update(comment_id, newData) {
  return knex("comments")
    .where({ comment_id })
    .update(newData)
    .returning("*")
    .then((data) => data[0]);
}

function destroy(comment_id) {
  return knex("comments").where({ comment_id }).del();
}

module.exports = {
  listComments,
  create,
  read,
  update,
  delete: destroy,
};
