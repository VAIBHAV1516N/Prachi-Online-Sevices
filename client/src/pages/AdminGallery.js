import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import API from '../api';
import './AdminGallery.css';

const CATEGORIES = ['Customer Service', 'Documentation', 'Government', 'Banking', 'Education', 'Insurance', 'Other'];

const emptyForm = {
  url: '',
  caption: '',
  category: 'Other',
  isActive: true,
  order: 0,
};

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editImage, setEditImage] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState('');
  const [previewError, setPreviewError] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/gallery');
      setImages(res.data.data);
    } catch {
      toast.error('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const openAdd = () => {
    setEditImage(null);
    setForm(emptyForm);
    setPreview('');
    setPreviewError(false);
    setShowModal(true);
  };

  const openEdit = (img) => {
    setEditImage(img);
    setForm({
      url: img.url,
      caption: img.caption,
      category: img.category || 'Other',
      isActive: img.isActive,
      order: img.order || 0,
    });
    setPreview(img.url);
    setPreviewError(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditImage(null);
    setForm(emptyForm);
    setPreview('');
    setPreviewError(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: newVal });
    if (name === 'url') {
      setPreview(value);
      setPreviewError(false);
    }
  };

  const handleSave = async () => {
    if (!form.url.trim() || !form.caption.trim()) {
      toast.error('Image URL and caption are required');
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) };
      if (editImage) {
        await API.put(`/admin/gallery/${editImage._id}`, payload);
        toast.success('Image updated!');
      } else {
        await API.post('/admin/gallery', payload);
        toast.success('Image added to gallery!');
      }
      closeModal();
      fetchImages();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, caption) => {
    if (!window.confirm(`Remove "${caption}" from gallery?`)) return;
    try {
      await API.delete(`/admin/gallery/${id}`);
      toast.success('Image removed');
      fetchImages();
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleToggleActive = async (img) => {
    try {
      await API.put(`/admin/gallery/${img._id}`, { ...img, isActive: !img.isActive });
      toast.success(`Image ${!img.isActive ? 'shown' : 'hidden'} on website`);
      fetchImages();
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="admin-gallery">
      <div className="page-header">
        <div>
          <h1>🖼️ Gallery</h1>
          <p>Manage images shown in the Gallery section on the homepage</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>➕ Add Image</button>
      </div>

      {/* Stats strip */}
      <div className="gallery-stats-strip">
        <div className="g-stat"><span>{images.length}</span> Total Images</div>
        <div className="g-stat"><span>{images.filter(i => i.isActive).length}</span> Visible</div>
        <div className="g-stat"><span>{images.filter(i => !i.isActive).length}</span> Hidden</div>
        <button className="btn btn-outline btn-sm" onClick={fetchImages} style={{ marginLeft: 'auto' }}>🔄 Refresh</button>
      </div>

      {loading ? (
        <div className="spinner" />
      ) : images.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-icon">🖼️</div>
          <p>No gallery images yet.</p>
          <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={openAdd}>
            ➕ Add First Image
          </button>
        </div>
      ) : (
        <div className="gallery-admin-grid">
          {images.map((img, i) => (
            <div className={`gallery-admin-card ${!img.isActive ? 'hidden-card' : ''}`} key={img._id}>

              {/* Image thumbnail */}
              <div className="gallery-thumb" onClick={() => setLightbox(i)}>
                <img
                  src={img.url}
                  alt={img.caption}
                  onError={e => { e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error'; }}
                />
                <div className="thumb-overlay">
                  <span>🔍 Preview</span>
                </div>
                {!img.isActive && <div className="hidden-badge">Hidden</div>}
              </div>

              {/* Card info */}
              <div className="gallery-admin-info">
                <div className="gai-category">{img.category}</div>
                <div className="gai-caption">{img.caption}</div>
                <div className="gai-meta">
                  Order: <strong>{img.order}</strong>
                  <span className={`dot-status ${img.isActive ? 'dot-active' : 'dot-hidden'}`}></span>
                  {img.isActive ? 'Visible' : 'Hidden'}
                </div>
              </div>

              {/* Actions */}
              <div className="gallery-admin-actions">
                <button
                  className={`btn btn-sm ${img.isActive ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => handleToggleActive(img)}
                  title={img.isActive ? 'Hide from website' : 'Show on website'}
                >
                  {img.isActive ? '👁️ Hide' : '👁️ Show'}
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => openEdit(img)}>✏️ Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(img._id, img.caption)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Preview */}
      {lightbox !== null && images[lightbox] && (
        <div className="modal-overlay" onClick={() => setLightbox(null)}>
          <div className="lightbox-preview" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={images[lightbox].url} alt={images[lightbox].caption}
              onError={e => { e.target.src = 'https://via.placeholder.com/800x500?text=Image+Error'; }} />
            <div className="lb-footer">
              <span className="category-pill">{images[lightbox].category}</span>
              <p>{images[lightbox].caption}</p>
              <span style={{ color: 'var(--gray)', fontSize: '0.8rem' }}>{lightbox + 1} / {images.length}</span>
            </div>
            <div className="lb-nav">
              <button onClick={() => setLightbox((lightbox - 1 + images.length) % images.length)}>‹ Prev</button>
              <button onClick={() => setLightbox((lightbox + 1) % images.length)}>Next ›</button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal gallery-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editImage ? '✏️ Edit Image' : '➕ Add Gallery Image'}</h3>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              {/* URL + Live Preview */}
              <div className="form-group">
                <label className="form-label">Image URL *</label>
                <input
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="https://images.unsplash.com/..."
                />
                <div className="url-hint">
                  💡 Paste any direct image URL (Unsplash, Cloudinary, or your hosted image)
                </div>
              </div>

              {/* Live Preview Box */}
              {preview && (
                <div className="img-preview-box">
                  {previewError ? (
                    <div className="preview-error">⚠️ Could not load image. Check the URL.</div>
                  ) : (
                    <img
                      src={preview}
                      alt="preview"
                      onError={() => setPreviewError(true)}
                      onLoad={() => setPreviewError(false)}
                    />
                  )}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Caption *</label>
                <input
                  name="caption"
                  value={form.caption}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Serving Customers Daily"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select name="category" value={form.category} onChange={handleChange} className="form-control form-select">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Display Order</label>
                  <input
                    name="order"
                    type="number"
                    min="0"
                    value={form.order}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="0"
                  />
                  <div className="url-hint">Lower number = shown first</div>
                </div>
              </div>

              <div className="form-group toggle-group">
                <label className="toggle-label">
                  <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                  <span className="toggle-switch"></span>
                  Show this image on the website
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? '⏳ Saving...' : editImage ? '✅ Update Image' : '➕ Add to Gallery'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
