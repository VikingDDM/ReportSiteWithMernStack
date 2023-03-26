import express from "express";
import { createFreelancerInfoHandler, 
         updateFreelancerInfoHandler, 
         deleteFreelancerInfoHandler, 
         getFreelancerInfoHandler} from "../controllers/freelancerInfoController";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createFreelancerInfoSchema, updateFreelancerInfoSchema, deleteFreelancerInfoSchema} from "../schemas/freelancerInfoSchema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .route("/")
  .post(
    validate(createFreelancerInfoSchema),
    createFreelancerInfoHandler
  )
  .get(getFreelancerInfoHandler)

router
  .route("/:freelancerinfoId")
  .patch(
    validate(updateFreelancerInfoSchema),
    updateFreelancerInfoHandler
  )
  .delete(validate(deleteFreelancerInfoSchema), deleteFreelancerInfoHandler);

  export default router;