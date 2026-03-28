import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api";
import "./AdminServices.css";

const CATEGORIES = [
  "Government",
  "Banking",
  "Insurance",
  "Utility",
  "Education",
  "Other",
];
const emptyForm = {
  name: "",
  price: "",
  description: "",
  category: "Government",
  isActive: true,
};

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/services");
      setServices(res.data.data);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAdd = () => {
    setEditService(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (svc) => {
    setEditService(svc);
    setForm({
      name: svc.name,
      price: svc.price,
      description: svc.description,
      category: svc.category || "Other",
      isActive: svc.isActive,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditService(null);
    setForm(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.description.trim() || form.price === "") {
      toast.error("Please fill all required fields");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price) };
      if (editService) {
        await API.put(`/admin/service/${editService._id}`, payload);
        toast.success("Service updated!");
      } else {
        await API.post("/admin/service", payload);
        toast.success("Service added!");
      }
      closeModal();
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete service "${name}"?`)) return;
    try {
      await API.delete(`/admin/service/${id}`);
      toast.success("Service deleted");
      fetchServices();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.category || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="admin-services">
      <div className="page-header">
        <div>
          <h1>Services</h1>
          <p>Add, edit or remove services offered at Prachi CSC</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          ➕ Add Service
        </button>
      </div>

      {/* Toolbar */}
      <div className="svc-toolbar">
        <input
          className="form-control search-input"
          placeholder="🔍 Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline btn-sm" onClick={fetchServices}>
          🔄 Refresh
        </button>
      </div>

      {/* Stats strip */}
      <div className="svc-stats">
        <div className="svc-stat">
          <span>{services.length}</span> Total
        </div>
        <div className="svc-stat">
          <span>{services.filter((s) => s.isActive).length}</span> Active
        </div>
        <div className="svc-stat">
          <span>{services.filter((s) => !s.isActive).length}</span> Inactive
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>All Services ({filtered.length})</h2>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <p>📭 No services found.</p>
            <button
              className="btn btn-primary"
              style={{ marginTop: 12 }}
              onClick={openAdd}
            >
              Add First Service
            </button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Service Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((svc, i) => (
                  <tr key={svc._id}>
                    <td>{i + 1}</td>
                    <td>
                      <strong>{svc.name}</strong>
                      <div className="svc-desc-preview">{svc.description}</div>
                    </td>
                    <td>
                      <span className="category-pill">
                        {svc.category || "Other"}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: "var(--primary)" }}>
                        {svc.price === 0 ? "Free" : `₹${svc.price}`}
                      </strong>
                    </td>
                    <td>
                      <span
                        className={`badge ${svc.isActive ? "badge-completed" : "badge-cancelled"}`}
                      >
                        {svc.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => openEdit(svc)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(svc._id, svc.name)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editService ? "✏️ Edit Service" : "➕ Add New Service"}</h3>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Service Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Aadhar Card Correction"
                />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="0 for free"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="form-control form-select"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control"
                  rows={3}
                  placeholder="Briefly describe this service..."
                />
              </div>
              <div className="form-group toggle-group">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                  <span className="toggle-switch"></span>
                  Service is Active (visible on website)
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? "⏳ Saving..."
                  : editService
                    ? "✅ Update Service"
                    : "➕ Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
