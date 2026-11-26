
import { useEffect, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import {
  getFeedback,
  deleteFeedback
} from "../services/feedbackService";

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadFeedback = async () => {
    try {
      setError("");
      const data = await getFeedback();
      setFeedbacks(
        Array.isArray(data) ? data : data.feedbacks || []
      );
    } catch {
      setError("Unable to load feedback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return;
    }

    try {
      await deleteFeedback(id);
      if (editing?._id === id) setEditing(null);
      await loadFeedback();
    } catch {
      setError("Unable to delete feedback.");
    }
  };

  const averageRating = feedbacks.length
    ? (
        feedbacks.reduce(
          (sum, item) => sum + Number(item.rating || 0), 0
        ) / feedbacks.length
      ).toFixed(1)
    : "0.0";

  return (
    <main className="container all-feedback-page">

      <section className="all-feedback-hero">
        <span className="feedback-tag">STUDENT VOICES</span>
        <h1>Student Feedback</h1>
        <p>Discover what students say about their learning experience.</p>
      </section>

      <section className="feedback-stats">
        <div className="feedback-stat-card">
          <div className="stat-icon">✉</div>
          <div>
            <p>Total Feedback</p>
            <h2>{feedbacks.length}</h2>
            <span>Student responses</span>
          </div>
        </div>

        <div className="feedback-stat-card">
          <div className="stat-icon star-icon">★</div>
          <div>
            <p>Average Rating</p>
            <h2>{averageRating}<small> / 5</small></h2>
            <span>Overall experience</span>
          </div>
        </div>
      </section>

      {editing && (
        <section className="form-card feedback-edit-form">
          <h2>Edit Feedback</h2>
          <FeedbackForm
            key={editing._id}
            editingFeedback={editing}
            onSuccess={() => {
              setEditing(null);
              loadFeedback();
            }}
            onCancel={() => setEditing(null)}
          />
        </section>
      )}

      <section className="all-feedback-content">
        <div className="all-feedback-title">
          <div>
            <h2>Recent Reviews</h2>
            <p>Feedback shared by our students</p>
          </div>
          <span className="response-count">
            {feedbacks.length} Responses
          </span>
        </div>

        {error && <p className="message">{error}</p>}

        {loading ? (
          <div className="feedback-empty">Loading feedback...</div>
        ) : feedbacks.length === 0 ? (
          <div className="feedback-empty">
            <div className="empty-icon">✉</div>
            <h3>No feedback yet</h3>
            <p>Student feedback will appear here after submission.</p>
          </div>
        ) : (
          <div className="professional-feedback-list">
            {feedbacks.map((item) => {
              const rating = Math.min(
                5,
                Math.max(0, Number(item.rating) || 0)
              );

              return (
                <article className="professional-feedback-card" key={item._id}>
                  <div className="professional-card-header">
                    <div className="professional-student">
                      <div className="professional-avatar">
                        {item.name?.charAt(0).toUpperCase() || "S"}
                      </div>
                      <div>
                        <h3>{item.name}</h3>
                        <span>Student</span>
                      </div>
                    </div>

                    <span className="professional-rating">
                      ★ {rating}/5
                    </span>
                  </div>

                  <div className="professional-stars">
                    {"★".repeat(rating)}
                    <span>{"☆".repeat(5 - rating)}</span>
                  </div>

                  <p className="professional-comment">
                    {item.comment}
                  </p>

                  <div className="professional-card-footer">
                    <span className="professional-date">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "Recently submitted"}
                    </span>

                    <div className="professional-actions">
                      <button
                        className="professional-edit"
                        onClick={() => setEditing(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="professional-delete"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default FeedbackList;
