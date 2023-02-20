const service = require("./bookmarks.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const validations = require("./validations/validations");

async function listAllBookmarks(req, res) {
  const data = await service.listAllBookmarks();
  res.status(200).json({ data });
}

async function create(req, res) {
  //newData = { user_id, media_id }
  const { data: newData } = req.body;
  const data = await service.create(newData);
  res.status(201).json({ data });
}

async function read(req, res) {
  const { userId } = req.params;
  const data = await service.read(userId);
  res.status(200).json({ data });
}

async function readWithoutMediaData(req, res) {
  const { userId } = req.params;
  const data = await service.readWithoutMediaData(userId);
  res.status(200).json({ data });
}

async function destroy(req, res) {
  // deleteData = { user_id, media_id }
  const { data: deleteData } = req.body;
  await service.delete(deleteData);
  res.sendStatus(204);
}

module.exports = {
  listAllBookmarks: [asyncErrorBoundary(listAllBookmarks)],
  create: [
    asyncErrorBoundary(validations.validateMediaExistsInBookmarks),
    asyncErrorBoundary(create)
  ],
  read: [asyncErrorBoundary(read)],
  readWithoutMediaData: [asyncErrorBoundary(readWithoutMediaData)],
  delete: [asyncErrorBoundary(destroy)],
};
