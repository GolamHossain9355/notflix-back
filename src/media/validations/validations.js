const service = require("../media.service");
const variables = require("./variables");

function validateGenres(req, _res, next) {
  const { genre } = req.query;
  const validGenres = variables.validGenres;

  if ((genre && validGenres.has(genre)) || !genre) return next();

  return next({
    status: 400,
    message: `Movie genre: ${genre} is not a valid genre`,
  });
}

function validateTypes(req, _res, next) {
  const { type } = req.query;

  if (type === undefined || type === "movie" || type === "series") {
    return next();
  }

  return next({
    status: 400,
    message: `Media type: ${type} is not a valid type`,
  });
}

function validateOrderAndAscDesc(req, _res, next) {
  const { orderBy, ascOrDesc } = req.query;
  const validOrderBys = variables.validOrderBys;
  const validAscOrDesc = variables.validAscOrDesc;

  if (orderBy && !validOrderBys.has(orderBy)) {
    return next({
      status: 400,
      message: `Input query orderBy: ${orderBy} is not valid`,
    });
  }
  if (ascOrDesc && !validAscOrDesc.has(ascOrDesc)) {
    return next({
      status: 400,
      message: `Input query ascOrDesc: ${ascOrDesc} is not valid`,
    });
  }
  return next();
}

async function validateMediaExists(req, res, next) {
  const { mediaId } = req.params;
  const foundMedia = await service.read(mediaId);

  if (foundMedia.length === 0) {
    return next({
      status: 404,
      message: `movie with the id: ${mediaId} not found`,
    });
  }

  res.locals.foundMedia = foundMedia;
  return next();
}

function validateReqBody(req, res, next) {
  const { data: newData } = req.body;
  const validUpdateData = variables.validRequestBodyData;

  for (const key of Object.keys(newData)) {
    if (!validUpdateData.has(key)) {
      return next({
        status: 404,
        message: `Cannot create or update the value for ${key}`,
      });
    }
  }

  res.locals.newData = newData;
  return next();
}

module.exports = {
  validateGenres,
  validateTypes,
  validateOrderAndAscDesc,
  validateMediaExists,
  validateReqBody,
};
