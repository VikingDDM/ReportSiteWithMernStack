import express from "express";
import {
  createReportHandler,
  deleteReportHandler,
  updateReportHandler,
  getUserDailyReportsHandler,
  getUserWeeklyReportsHandler,
  getDailyReportStatusHandler,
  getReportStatusHandler,
} from "../controllers/reportController";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createReportSchema,
  deleteReportSchema,
  updateReportSchema,
  getReportStatusSchema,
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
  .route("/reportstatus/:reportId")
  .get(validate(getReportStatusSchema), getReportStatusHandler);
router
  .route("/:reportId")
  .patch(
    validate(updateReportSchema),
    updateReportHandler
  )
  .delete(validate(deleteReportSchema), deleteReportHandler);

export default router;
