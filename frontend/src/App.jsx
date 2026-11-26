
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FeedbackList from "./pages/FeedbackList";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<FeedbackList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
