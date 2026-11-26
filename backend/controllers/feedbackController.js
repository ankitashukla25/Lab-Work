
const Feedback = require("../models/Feedback");

// CREATE
const createFeedback = async (req, res, next) => {
  try {
    const { name, rating, comment } = req.body;

    const feedback = await Feedback.create({
      name,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      message: "Feedback created successfully",
      feedback
    });
  } catch (error) {
    next(error);
  }
};

// READ
const getAllFeedback = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateFeedback = async (req, res, next) => {
  try {
    const { name, rating, comment } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { name, rating, comment },
      {
        new: true,
        runValidators: true
      }
    );

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback updated successfully",
      feedback
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
const deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
  updateFeedback,
  deleteFeedback
};
