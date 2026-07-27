const { Router } = require("express");
const {
  createSubTask,
  createTask,
  deleteTask,
  deleteSubTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
} = require("../Controllers/task.controllers");
const validate = require("../Middlewares/validator.middlewre");
const {
  createTaskValidator,
  updateTaskValidator,
  createSubTaskValidator,
} = require("../validators/index");
const {
  verifyJWT,
  validateProjectPermission,
} = require("../Middlewares/auth.middlewares");
const { AvailableUserRole, UserRolesEnum } = require("../utils/constants");
const { upload } = require("../Middlewares/multer.middleware");

const router = Router();
router.use(verifyJWT);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRole), getTasks)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    upload.array("attachments", 5),
    createTaskValidator(),
    validate,
    createTask
  );

router
  .route("/:projectId/t/:taskId")
  .get(validateProjectPermission(AvailableUserRole), getTaskById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    updateTaskValidator(),
    validate,
    updateTask
  )
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    deleteTask
  );

router
  .route("/:projectId/t/:taskId/subtasks")
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    createSubTaskValidator(),
    validate,
    createSubTask
  );

router
  .route("/:projectId/st/:subTaskId")
  .put(validateProjectPermission(AvailableUserRole), updateSubTask)
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    deleteSubTask
  );

module.exports = router;
