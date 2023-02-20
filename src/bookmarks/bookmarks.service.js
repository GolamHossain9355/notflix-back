const knex = require("../db/connections");
const reduceProperties = require("../utils/reduce-properties");

function listAllBookmarks() {
  return knex("bookmarks").select("*");
}

function create(newData) {
  //newData = { user_id, media_id }
  return knex("bookmarks")
    .insert(newData)
    .returning("*")
    .then((data) => data[0]);
}

const mediaReduce = reduceProperties("media", {
  media_id: ["media", null, "media_id"],
  type: ["media", null, "type"],
  image: ["media", null, "image"],
  title: ["media", null, "title"],
  runtime: ["media", null, "runtime"],
  year_released: ["media", null, "year_released"],
  genres: ["media", null, "genres"],
  content_rating: ["media", null, "content_rating"],
  metacritic_rating: ["media", null, "metacritic_rating"],
  imDb_rating: ["media", null, "imDb_rating"],
  summery: ["media", null, "summery"],
  cast: ["media", null, "cast"],
});

const shortMediaReduce = reduceProperties("bookmarks", {
  media_id: ["media", null, "media_id"],
});

function read(user_id) {
  return knex("bookmarks as b")
    .join("media as m", "m.media_id", "b.media_id")
    .select("m.*", "b.user_id")
    .where({ "b.user_id": user_id })
    .orderBy("m.media_id")
}

function readWithoutMediaData(user_id) {
  return knex("bookmarks")
    .select("user_id", "media_id")
    .where({ user_id })
    .orderBy("media_id");
}

function readMediaExistsInBookmarks(user_id, media_id) {
  return knex("bookmarks").where({ user_id, media_id });
}

function destroy(deleteData) {
  return knex("bookmarks")
    .where({
      user_id: deleteData.user_id,
      media_id: deleteData.media_id,
    })
    .del();
}

module.exports = {
  listAllBookmarks,
  create,
  read,
  readWithoutMediaData,
  readMediaExistsInBookmarks,
  delete: destroy,
};
