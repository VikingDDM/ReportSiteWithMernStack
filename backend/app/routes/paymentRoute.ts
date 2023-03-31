import express from "express";
import { createPayPlanHandler, 
         createPayHistoryHandler, 
         getMonthlyPaymentHandler, 
         updatePaymentPlanHandler, 
         deletePayPlanHandler,
         updatePaymentHistoryHandler, 
         getPayPlanHandler,
         getAllMonthlyPaymentHandler,
         getAllYearlyPaymentHandler,
         getAllPaymentHistoryHandler,
         deletePaymentHandler} from "../controllers/paymentController";
import { validate } from "../middleware/validate";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { createPayPlanSchema, 
         createPayHistorySchema, 
         updatePayHistorySchema,
         updatePayPlanSchema,
         deletePaymentSchema,
         getAllPayHistorySchema} from "../schemas/paymentSchema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .route("/payplan")
  .post(
    validate(createPayPlanSchema),
    createPayPlanHandler
  )
  .get(getPayPlanHandler)

router
  .route("/payplan/:paymentId")
  .patch(
    validate(updatePayPlanSchema),
    updatePaymentPlanHandler
  )
  .delete(validate(deletePaymentSchema), deletePayPlanHandler);

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
  .route("/monthlyall")
  .get(getAllMonthlyPaymentHandler)

router
  .route("/:paymentId")
  .delete(validate(deletePaymentSchema), deletePaymentHandler);
router
  .route("/allHistory/:paymentId")
  .get(validate(getAllPayHistorySchema), getAllPaymentHistoryHandler)
router
  .route("/yearlyall")
  .get(getAllYearlyPaymentHandler);

  export default router;