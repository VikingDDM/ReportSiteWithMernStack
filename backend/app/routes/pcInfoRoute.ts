import express from "express";
import { createPcInfoHandler, 
         updatePcInfoHandler, 
         deletePcInfoHandler, 
         getPcInfoHandler} from "../controllers/pcInfoController";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createPcInfoSchema, updatePcInfoSchema, deletePcInfoSchema} from "../schemas/pcInfoSchema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .route("/")
  .post(
    validate(createPcInfoSchema),
    createPcInfoHandler
  )
  .get(getPcInfoHandler)

router
  .route("/:pcinfoId")
  .patch(
    validate(updatePcInfoSchema),
    updatePcInfoHandler
  )
  .delete(validate(deletePcInfoSchema), deletePcInfoHandler);

  export default router;