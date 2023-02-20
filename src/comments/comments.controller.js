const service = require("./comments.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mediaValidations = require("../media/validations/validations");
const validations = require("./validations/validations");

async function listComments(req, res) {
  const { mediaId } = req.params;
  const data = await service.listComments(mediaId);
  res.status(200).json({ data });
}

async function create(req, res) {
  const { mediaId } = req.params;
  let newData = res.locals.newData;

  newData = {
    media_id: mediaId,
    ...newData,
  };

  const data = await service.create(mediaId, newData);
  res.status(200).json({ data });
}

async function update(req, res) {
  const { commentId } = req.params;
  const newData = res.locals.newData;

  const data = await service.update(commentId, newData);
  res.status(200).json({ data });
}

async function destroy(req, res) {
  const { commentId } = req.params;
  await service.delete(commentId);
  res.sendStatus(204);
}

module.exports = {
  listComments: [
    asyncErrorBoundary(mediaValidations.validateMediaExists),
    asyncErrorBoundary(listComments),
  ],
  create: [
    asyncErrorBoundary(mediaValidations.validateMediaExists),
    validations.validateReqBody,
    validations.validateCreateReqBody,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(mediaValidations.validateMediaExists),
    asyncErrorBoundary(validations.validateCommentExists),
    validations.validateReqBody,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(mediaValidations.validateMediaExists),
    asyncErrorBoundary(validations.validateCommentExists),
    asyncErrorBoundary(destroy),
  ],
};
