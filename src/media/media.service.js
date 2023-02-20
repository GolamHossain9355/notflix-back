const knex = require("../db/connections");

function listAllMedia(inputData) {
  return knex("media")
    .where("genres", "like", `%${inputData.genre}%`)
    .where("type", "like", `%${inputData.type}%`)
    .orderBy(inputData.orderBy, inputData.ascOrDesc)
    .limit(inputData.limit);
}

function filterBySearchWord(searchWord, limit) {
  return knex("media")
    .whereRaw("LOWER(title) LIKE ?", `%${searchWord.toLowerCase()}%`)
    .orderBy("title")
    .limit(limit)
}

function listRandomMedia(limit = 10) {
  return knex("media")
    .where("imDb_rating", ">", 6)
    .orderBy(knex.raw("Random()"))
    .limit(limit);
}

function create(newData) {
  return knex("media")
    .insert(newData)
    .returning("*")
    .then((data) => data[0]);
}

function read(media_id) {
  return knex("media").where({ media_id }).first();
}

function update(media_id, newData) {
  return knex("media")
    .where({ media_id })
    .update(newData)
    .returning("*")
    .then((data) => data[0]);
}

function destroy(media_id) {
  return knex("media").where({ media_id }).del()
}

module.exports = {
  listAllMedia,
  filterBySearchWord,
  listRandomMedia,
  read,
  update,
  create,
  delete: destroy,
};
