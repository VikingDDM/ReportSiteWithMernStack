import express from 'express';
import {
  getAllUsersHandler,
  getMeHandler,
  updateRoleHandler,
  deleteUserHandler,
  updatePasswordHandler,
  getServerTimeZoneHandler,
  updateServerTimeZoneHandler,
} from '../controllers/userController';
import {updateRoleSchema, deleteUserSchema, updatePasswordSchema, updateTimeZoneSchema} from '../schemas/userSchema'
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from "../middleware/validate";

const router = express.Router();
router.use(deserializeUser, requireUser);


// Get my info route
router.get('/me', getMeHandler);
router.get('/all',getAllUsersHandler);
router.get('/timezone',getServerTimeZoneHandler);
router
  .route("/timezone/:userinfoId")
  .patch(
    validate(updateTimeZoneSchema),
    updateServerTimeZoneHandler
  );
router
  .route("/pwd/:userinfoId")
  .patch(
    validate(updatePasswordSchema),
    updatePasswordHandler
  );
router
  .route("/:userinfoId")
  .patch(
    validate(updateRoleSchema),
    updateRoleHandler
  )
  .delete(validate(deleteUserSchema), deleteUserHandler);

export default router;

