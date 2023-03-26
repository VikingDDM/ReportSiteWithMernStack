import express from "express";
import { createPayInfoHandler, 
         updatePayInfoHandler, 
         deletePayInfoHandler, 
         getPayInfoHandler} from "../controllers/payInfoController";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createPayInfoSchema, updatePayInfoSchema, deletePayInfoSchema} from "../schemas/paymentInfoSchema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .route("/")
  .post(
    validate(createPayInfoSchema),
    createPayInfoHandler
  )
  .get(getPayInfoHandler)

router
  .route("/:payinfoId")
  .patch(
    validate(updatePayInfoSchema),
    updatePayInfoHandler
  )
  .delete(validate(deletePayInfoSchema), deletePayInfoHandler);

  export default router;