import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import API from '../api';
import './AdminRequests.css';

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
const badgeClass = { Pending: 'badge-pending', 'In Progress': 'badge-progress', Completed: 'badge-completed', Cancelled: 'badge-cancelled' };

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [selected, setSelected] = useState(null);
  const [updateForm, setUpdateForm] = useState({ status: '', adminNote: '' });
  const [updating, setUpdating] = useState(false);
  const [search, setSearch] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = filterStatus ? `?status=${filterStatus}` : '';
      const res = await API.get(`/admin/requests${params}`);
      setRequests(res.data.data);
    } catch {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, [filterStatus]);

  const openModal = (req) => {
    setSelected(req);
    setUpdateForm({ status: req.status, adminNote: req.adminNote || '' });
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await API.put(`/admin/request/${selected._id}`, updateForm);
      toast.success('Request updated!');
      setSelected(null);
      fetchRequests();
    } catch {
      toast.error('Update failed');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this request?')) return;
    try {
      await API.delete(`/admin/request/${id}`);
      toast.success('Deleted');
      fetchRequests();
    } catch {
      toast.error('Delete failed');
    }
  };

  const filtered = requests.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search) ||
    r.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-requests">
      <div className="page-header">
        <h1>Service Requests</h1>
        <p>Manage and update all incoming service requests</p>
      </div>

      {/* Filters */}
      <div className="req-toolbar">
        <input
          className="form-control search-input"
          placeholder="🔍 Search by name, phone, service..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="form-control form-select filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="btn btn-outline btn-sm" onClick={fetchRequests}>🔄 Refresh</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Requests ({filtered.length})</h2>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : filtered.length === 0 ? (
          <div className="empty-state">📭 No requests found</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((req, i) => (
                  <tr key={req._id}>
                    <td>{i + 1}</td>
                    <td><strong>{req.name}</strong>{req.email && <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{req.email}</div>}</td>
                    <td>{req.phone}</td>
                    <td>{req.service}</td>
                    <td><span className={`badge ${badgeClass[req.status]}`}>{req.status}</span></td>
                    <td>{new Date(req.createdAt).toLocaleDateString('en-IN')}</td>
                    <td>
                      <div className="action-btns">
                        <button className="btn btn-primary btn-sm" onClick={() => openModal(req)}>✏️ Update</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(req._id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Update Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Request</h3>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="req-info-grid">
                <div><span>Name</span><strong>{selected.name}</strong></div>
                <div><span>Phone</span><strong>{selected.phone}</strong></div>
                <div><span>Service</span><strong>{selected.service}</strong></div>
                <div><span>Submitted</span><strong>{new Date(selected.createdAt).toLocaleDateString('en-IN')}</strong></div>
              </div>
              {selected.message && (
                <div className="req-message"><strong>Message:</strong> {selected.message}</div>
              )}
              <div className="form-group">
                <label className="form-label">Update Status</label>
                <select
                  className="form-control form-select"
                  value={updateForm.status}
                  onChange={e => setUpdateForm({ ...updateForm, status: e.target.value })}
                >
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Admin Note (Optional)</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={updateForm.adminNote}
                  onChange={e => setUpdateForm({ ...updateForm, adminNote: e.target.value })}
                  placeholder="Add a note for your records..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleUpdate} disabled={updating}>
                {updating ? '⏳ Saving...' : '✅ Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
