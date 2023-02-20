const mediaData = require("../fixtures/mediaData");

exports.seed = function (knex) {
  return knex
    .raw("truncate table media restart identity cascade")
    .then(() => mediaData().then((data) => knex("media").insert(data)));
};
