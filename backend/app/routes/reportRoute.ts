import express from "express";
import {
  createReportHandler,
  deleteReportHandler,
  updateReportHandler,
  getUserDailyReportsHandler,
  getUserWeeklyReportsHandler,
  getDailyReportStatusHandler,
  getMonthlyReportStatusHandler,
  getWeeklyReportStatusHandler
} from "../controllers/reportController";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createReportSchema,
  deleteReportSchema,
  updateReportSchema,
} from "../schemas/reportSchema";

const router = express.Router();

router.use(deserializeUser, requireUser);

router
  .route("/")
  .post(
    validate(createReportSchema),
    createReportHandler
  )
router
  .route("/userdailyreports")
  .get(getUserDailyReportsHandler)
router
  .route("/userweeklyreports")
  .get(getUserWeeklyReportsHandler)
router
  .route("/dailyreportstatus")
  .get(getDailyReportStatusHandler)
router
  .route("/weeklyreportstatus")
  .get(getWeeklyReportStatusHandler)
router
  .route("/getmonthlyreportstatus")
  .get(getMonthlyReportStatusHandler)
router
  .route("/:reportId")
  .patch(
    validate(updateReportSchema),
    updateReportHandler
  )
  .delete(validate(deleteReportSchema), deleteReportHandler);

export default router;
