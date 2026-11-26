
import { useState } from "react";
import { addFeedback, updateFeedback } from "../services/feedbackService";

function FeedbackForm({ editingFeedback, onSuccess, onCancel }) {
  const [name, setName] = useState(editingFeedback?.name || "");
  const [rating, setRating] = useState(editingFeedback?.rating || "");
  const [comment, setComment] = useState(editingFeedback?.comment || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = {
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim()
    };

    try {
      if (editingFeedback) {
        await updateFeedback(editingFeedback._id, data);
        setMessage("Feedback updated successfully!");
      } else {
        await addFeedback(data);
        setMessage("Feedback submitted successfully!");
        setName("");
        setRating("");
        setComment("");
      }

      onSuccess();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Student Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength="2"
          maxLength="50"
          required
        />
      </div>

      <div className="form-group">
        <label>Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        >
          <option value="">Select Rating</option>
          {[1, 2, 3, 4, 5].map((number) => (
            <option key={number} value={number}>
              {number} / 5
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Your Feedback</label>
        <textarea
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          minLength="5"
          maxLength="1000"
          required
        />
      </div>

      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? "Please wait..." : editingFeedback ? "Update Feedback" : "Submit Feedback"}
      </button>

      {editingFeedback && (
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      )}

      {message && <p className="message">{message}</p>}
    </form>
  );
}

export default FeedbackForm;
