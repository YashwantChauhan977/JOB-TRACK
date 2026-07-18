import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/applications", {
        params: { status, search, page, limit: 8 },
      });
      setApplications(data.applications);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchApplications();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await api.delete(`/applications/${id}`);
      fetchApplications();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="container">
      <h2>Applications</h2>
      {error && <div className="error">{error}</div>}

      <form className="toolbar" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="All">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
        <button className="btn" type="submit">Search</button>
        <Link className="btn btn-secondary" to="/applications/new">+ Add New</Link>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applications found. Start by adding one!</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Type</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Follow-up</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>{app.company}</td>
                  <td>{app.role}</td>
                  <td>{app.type}</td>
                  <td><span className={`badge badge-${app.status}`}>{app.status}</span></td>
                  <td>{app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : "-"}</td>
                  <td>{app.followUpDate ? new Date(app.followUpDate).toLocaleDateString() : "-"}</td>
                  <td className="actions">
                    <Link className="btn" to={`/applications/edit/${app._id}`}>Edit</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(app._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              className="btn btn-secondary"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>
            <span style={{ alignSelf: "center" }}>Page {page} of {totalPages}</span>
            <button
              className="btn btn-secondary"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
