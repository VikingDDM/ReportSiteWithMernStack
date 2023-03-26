import express from "express";
import { createVpsInfoHandler, 
         updateVpsInfoHandler, 
         deleteVpsInfoHandler, 
         getVpsInfoHandler} from "../controllers/vpsInfoController";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createVpsInfoSchema, updateVpsInfoSchema, deleteVpsInfoSchema} from "../schemas/vpsInfoschema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .route("/")
  .post(
    validate(createVpsInfoSchema),
    createVpsInfoHandler
  )
  .get(getVpsInfoHandler)

router
  .route("/:vpsinfoId")
  .patch(
    validate(updateVpsInfoSchema),
    updateVpsInfoHandler
  )
  .delete(validate(deleteVpsInfoSchema), deleteVpsInfoHandler);

  export default router;