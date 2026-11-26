
import { useState } from "react";
import FeedbackForm from "../components/FeedbackForm";

function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <main className="container">
      <section className="hero">
        <h1>Share Your Feedback</h1>
        <p>Your feedback helps us improve the learning experience.</p>
      </section>

      <section className="form-card">
        <h2>Student Feedback Form</h2>

        <FeedbackForm
          onSuccess={() => setRefresh(!refresh)}
        />
      </section>
    </main>
  );
}

export default Home;
