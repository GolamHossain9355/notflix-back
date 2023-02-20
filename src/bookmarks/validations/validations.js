const service = require("../bookmarks.service");
const mediaService = require("../../media/media.service");

async function validateMediaExistsInBookmarks(req, res, next) {
  const { data: newData } = req.body;
  const user_id = newData.user_id;
  const media_id = newData.media_id;

  const dataExists = await service.readMediaExistsInBookmarks(
    user_id,
    media_id
  );
  
  if (dataExists.length > 0) {
    await service.delete({ user_id, media_id });
    return res.sendStatus(204);
  }
  next();
}

async function validateRead(req, res, next) {
  const { userId } = req.params;
  const data = await service.read(userId);
  if (data.length === 0) {
    return next({
      status: 400,
      message: `There are no bookmarks available for this user: ${userId}`,
    });
  }

  res.locals.readData = data;
  return next();
}

async function validateMediaExists(req, res, next) {
  const { userId } = req.params;
  const { data: mediaId } = req.body;
  const media = await mediaService.read(mediaId);
}

module.exports = {
  validateRead,
  validateMediaExists,
  validateMediaExistsInBookmarks,
};
