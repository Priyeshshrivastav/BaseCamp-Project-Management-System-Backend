const { Router } = require("express");
const {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../Controllers/note.controllers");
const validate = require("../Middlewares/validator.middlewre");
const { createNoteValidator } = require("../validators/index");
const {
  verifyJWT,
  validateProjectPermission,
} = require("../Middlewares/auth.middlewares");
const { AvailableUserRole, UserRolesEnum } = require("../utils/constants");

const router = Router();
router.use(verifyJWT);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRole), getNotes)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createNoteValidator(),
    validate,
    createNote
  );

router
  .route("/:projectId/n/:noteId")
  .get(validateProjectPermission(AvailableUserRole), getNoteById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createNoteValidator(),
    validate,
    updateNote
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteNote);

module.exports = router;
