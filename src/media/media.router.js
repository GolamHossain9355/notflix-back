const router = require("express").Router();
const controller = require("./media.controller");
const commentsRouter = require("../comments/comments.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.listAllMedia)
  .post(controller.create)
  .all(methodNotAllowed);

router.route("/random")
  .get(controller.listRandomMedia)
  .all(methodNotAllowed);

router
  .route("/:mediaId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .use("/:mediaId/comments", commentsRouter);

module.exports = router;
