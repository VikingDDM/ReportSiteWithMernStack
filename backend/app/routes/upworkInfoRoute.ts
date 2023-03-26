import express from "express";
import { createUpworkInfoHandler, 
         updateUpworkInfoHandler, 
         deleteUpworkInfoHandler, 
         getUpworkInfoHandler} from "../controllers/upworkInfoController";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createUpworkInfoSchema, updateUpworkInfoSchema, deleteUpworkInfoSchema} from "../schemas/upworkInfoSchema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .route("/")
  .post(
    validate(createUpworkInfoSchema),
    createUpworkInfoHandler
  )
  .get(getUpworkInfoHandler)

router
  .route("/:upworkinfoId")
  .patch(
    validate(updateUpworkInfoSchema),
    updateUpworkInfoHandler
  )
  .delete(validate(deleteUpworkInfoSchema), deleteUpworkInfoHandler);

  export default router;