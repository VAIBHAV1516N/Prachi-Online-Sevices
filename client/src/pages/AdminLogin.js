import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      toast.error("Please enter credentials");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/admin/login", form);
      login(res.data.token, res.data.username);
      toast.success("Login successful!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🏛️</div>
          <h1>Prachi CSC</h1>
          <p>Admin Login</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control"
              placeholder="admin"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="pass-wrapper">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="form-control"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="pass-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? "⏳ Logging in..." : "🔐 Login to Dashboard"}
          </button>
        </form>

        <div className="login-footer">
          <a href="/">← Back to Website</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
