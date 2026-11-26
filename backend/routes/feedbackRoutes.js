const express = require("express");
const router = express.Router();

const {
  createFeedback,
  getAllFeedback,
  updateFeedback,
  deleteFeedback
} = require("../controllers/feedbackController");

router.post("/", createFeedback);
router.get("/", getAllFeedback);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;
