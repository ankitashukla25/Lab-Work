
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Student Feedback Manager
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/feedback">All Feedback</Link>
      </div>
    </nav>
  );
}

export default Navbar;
