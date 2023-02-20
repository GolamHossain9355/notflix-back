const router = require("express").Router({ mergeParams: true });
const controller = require("./bookmarks.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.listAllBookmarks)
  .post(controller.create)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route("/:userId")
  .get(controller.readWithoutMediaData)
  .all(methodNotAllowed);

router
  .route("/:userId/medias")
  .get(controller.read)
  .all(methodNotAllowed);

module.exports = router;