import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const emptyForm = {
  company: "",
  role: "",
  type: "Job",
  status: "Applied",
  appliedDate: "",
  followUpDate: "",
  location: "",
  jobLink: "",
  notes: "",
};

export default function ApplicationForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      const fetchApp = async () => {
        try {
          const { data } = await api.get(`/applications/${id}`);
          setForm({
            ...data,
            appliedDate: data.appliedDate ? data.appliedDate.substring(0, 10) : "",
            followUpDate: data.followUpDate ? data.followUpDate.substring(0, 10) : "",
          });
        } catch (err) {
          setError(err.response?.data?.message || "Failed to load application");
        }
      };
      fetchApp();
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/applications/${id}`, form);
      } else {
        await api.post("/applications", form);
      }
      navigate("/applications");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2>{isEdit ? "Edit Application" : "Add New Application"}</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company *</label>
            <input name="company" value={form.company} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Role *</label>
            <input name="role" value={form.role} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="Job">Job</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>
          <div className="form-group">
            <label>Applied Date</label>
            <input type="date" name="appliedDate" value={form.appliedDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Follow-up / Reminder Date</label>
            <input type="date" name="followUpDate" value={form.followUpDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input name="location" value={form.location} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Job Link</label>
            <input name="jobLink" value={form.jobLink} onChange={handleChange} placeholder="https://..." />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any notes about this application..." />
          </div>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update Application" : "Save Application"}
          </button>
        </form>
      </div>
    </div>
  );
}