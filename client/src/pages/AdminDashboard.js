import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./AdminDashboard.css";

const statusBadge = (status) => {
  const map = {
    Pending: "badge-pending",
    "In Progress": "badge-progress",
    Completed: "badge-completed",
    Cancelled: "badge-cancelled",
  };
  return (
    <span className={`badge ${map[status] || "badge-pending"}`}>{status}</span>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/stats")
      .then((res) => setStats(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" />;

  const cards = [
    {
      label: "Total Requests",
      value: stats?.total || 0,
      icon: "📋",
      color: "#dbeafe",
      textColor: "#1e40af",
    },
    {
      label: "Pending",
      value: stats?.pending || 0,
      icon: "⏳",
      color: "#fef3c7",
      textColor: "#92400e",
    },
    {
      label: "In Progress",
      value: stats?.inProgress || 0,
      icon: "🔄",
      color: "#ede9fe",
      textColor: "#5b21b6",
    },
    {
      label: "Completed",
      value: stats?.completed || 0,
      icon: "✅",
      color: "#d1fae5",
      textColor: "#065f46",
    },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="stats-cards">
        {cards.map((c, i) => (
          <div
            className="stat-card"
            key={i}
            style={{ "--card-bg": c.color, "--card-text": c.textColor }}
          >
            <div className="stat-card-icon">{c.icon}</div>
            <div className="stat-card-value">{c.value}</div>
            <div className="stat-card-label">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Requests */}
      <div className="card">
        <div className="card-header">
          <h2>Recent Requests</h2>
          <Link to="/admin/requests" className="btn btn-outline btn-sm">
            View All
          </Link>
        </div>
        {stats?.recent?.length === 0 ? (
          <div className="empty-state">
            <p>📭 No requests yet</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recent?.map((req) => (
                  <tr key={req._id}>
                    <td>
                      <strong>{req.name}</strong>
                    </td>
                    <td>{req.phone}</td>
                    <td>{req.service}</td>
                    <td>{statusBadge(req.status)}</td>
                    <td>
                      {new Date(req.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        <Link to="/admin/requests" className="quick-link-card">
          <span className="quick-link-icon">📋</span>
          <span>Manage Requests</span>
          <span className="quick-arrow">→</span>
        </Link>
        <Link to="/admin/services" className="quick-link-card">
          <span className="quick-link-icon">🛠️</span>
          <span>Manage Services</span>
          <span className="quick-arrow">→</span>
        </Link>
        <Link to="/admin/gallery" className="quick-link-card">
          <span className="quick-link-icon">🖼️</span>
          <span>Manage Gallery</span>
          <span className="quick-arrow">→</span>
        </Link>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="quick-link-card"
        >
          <span className="quick-link-icon">🌐</span>
          <span>View Website</span>
          <span className="quick-arrow">→</span>
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;
