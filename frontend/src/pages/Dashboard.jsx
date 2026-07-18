import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, Applied: 0, Interview: 0, Rejected: 0, Offer: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/applications/stats");
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-box">
            <div className="num">{stats.total}</div>
            <div>Total Applications</div>
          </div>
          <div className="stat-box">
            <div className="num">{stats.Applied}</div>
            <div>Applied</div>
          </div>
          <div className="stat-box">
            <div className="num">{stats.Interview}</div>
            <div>Interview</div>
          </div>
          <div className="stat-box">
            <div className="num">{stats.Offer}</div>
            <div>Offer</div>
          </div>
          <div className="stat-box">
            <div className="num">{stats.Rejected}</div>
            <div>Rejected</div>
          </div>
        </div>
      )}
      <div className="card">
        <p>Track every job or internship application you send out — status, notes, and follow-up reminders, all in one place.</p>
        <Link className="btn" to="/applications/new">+ Add New Application</Link>
        <Link className="btn btn-secondary" style={{ marginLeft: 10 }} to="/applications">View All Applications</Link>
      </div>
    </div>
  );
}
