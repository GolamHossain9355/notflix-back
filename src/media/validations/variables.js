const validGenres = new Map();
validGenres.set("Action", true);
validGenres.set("Adventure", true);
validGenres.set("Comedy", true);
validGenres.set("Crime", true);
validGenres.set("Drama", true);
validGenres.set("Family", true);
validGenres.set("Fantasy", true);
validGenres.set("Horror", true);
validGenres.set("Music", true);
validGenres.set("Mystery", true);
validGenres.set("Sci-Fi", true);
validGenres.set("Thriller", true);
validGenres.set("History", true);
validGenres.set("Biography", true);
validGenres.set("Romance", true);
validGenres.set("Sport", true);
validGenres.set("War", true);
validGenres.set("Western", true);
validGenres.set("Animation", true);
validGenres.set("Musical", true);

const validOrderBys = new Map();
validOrderBys.set("title", true);
validOrderBys.set("year_released", true);
validOrderBys.set("metacritic_rating", true);
validOrderBys.set("imDb_rating", true);
validOrderBys.set("id", true);
validOrderBys.set("genres", true);

const validAscOrDesc = new Map();
validAscOrDesc.set("asc", true);
validAscOrDesc.set("desc", true);

const validRequestBodyData = new Map();
validRequestBodyData.set("image", true);
validRequestBodyData.set("type", true);
validRequestBodyData.set("title", true);
validRequestBodyData.set("runtime", true);
validRequestBodyData.set("year_released", true);
validRequestBodyData.set("genres", true);
validRequestBodyData.set("content_rating", true);
validRequestBodyData.set("metacritic_rating", true);
validRequestBodyData.set("imDb_rating", true);
validRequestBodyData.set("summery", true);
validRequestBodyData.set("cast", true);

module.exports = {
  validGenres,
  validAscOrDesc,
  validOrderBys,
  validRequestBodyData,
};
