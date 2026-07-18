import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <Link to="/" className="brand">📋 Job Tracker</Link>
      <div>
        {token ? (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/applications">Applications</Link>
            <Link to="/applications/new">Add New</Link>
            <span style={{ marginLeft: 16 }}>Hi, {userName}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}