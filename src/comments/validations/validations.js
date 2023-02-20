const service = require("../comments.service");
const variables = require("./variables");

function validateReqBody(req, res, next) {
  const { data: newData } = req.body;
  const validReqData = variables.validReqData;

  for (const key of Object.keys(newData)) {
    if (!validReqData.has(key)) {
      return next({
        status: 400,
        message: `${key} is not a valid key`,
      });
    }
  }

  res.locals.newData = newData;
  return next();
}

function validateCreateReqBody(_req, res, next) {
  const newData = res.locals.newData;
  const validReqData = variables.validReqData;

  for (const key of validReqData.keys()) {
    if (!newData[key]) {
      return next({
        status: 400,
        message: `${key} is required to create a comment`,
      });
    }
  }

  return next();
}

async function validateCommentExists(req, _res, next) {
  const { commentId } = req.params;
  const foundComment = await service.read(commentId);

  if (!foundComment) {
    return next({
      status: 404,
      message: `Cannot find comment with the ID: ${commentId}`,
    });
  }

  return next();
}

module.exports = {
  validateReqBody,
  validateCreateReqBody,
  validateCommentExists,
};
