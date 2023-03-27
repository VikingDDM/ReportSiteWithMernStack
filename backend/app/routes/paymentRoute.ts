import express from "express";
import { createPayPlanHandler, 
         createPayHistoryHandler, 
         getMonthlyPaymentHandler, 
         updatePaymentPlanHandler, 
         updatePaymentHistoryHandler, 
         deletePaymentHandler} from "../controllers/paymentController";
import { validate } from "../middleware/validate";
import { createPayPlanSchema, 
         createPayHistorySchema, 
         updatePayHistorySchema,
         updatePayPlanSchema,
         deletePaymentSchema} from "../schemas/paymentSchema";

const router = express.Router();

router
  .route("/payplan")
  .post(
    validate(createPayPlanSchema),
    createPayPlanHandler
  )

router
  .route("/payplan/:paymentId")
  .patch(
    validate(updatePayPlanSchema),
    updatePaymentPlanHandler
  )

router
  .route("/payhistory")
  .post(
    validate(createPayHistorySchema),
     createPayHistoryHandler
  )

router
  .route("/payhistory/:paymentId")
  .patch(
    validate(updatePayHistorySchema),
    updatePaymentHistoryHandler
  )

router
.route("/monthlypay")
.get(getMonthlyPaymentHandler)

router
  .route("/:paymentId")
  .delete(validate(deletePaymentSchema), deletePaymentHandler);

  export default router;