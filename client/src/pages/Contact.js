import { useState } from "react";
import { toast } from "react-toastify";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We will get back to you soon.");
      setForm({ name: "", phone: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: "📍",
      label: "Address",
      value: "At. Ghodgaon Tal. Chopda Dist. Jalgaon, Maharashtra 425108",
    },
    { icon: "📞", label: "Phone", value: "+91 89566-47264" },
    { icon: "✉️", label: "Email", value: "barelaakash254@gmail.com" },
    {
      icon: "🕐",
      label: "Working Hours",
      value: "Monday – Saturday: 9:00 AM – 7:00 PM",
    },
  ];

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help — reach out anytime</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-layout">
          {/* Contact Info */}
          <div className="contact-info-panel">
            <h2>Get In Touch</h2>
            <p>
              Visit us at our center or send us a message and we'll respond
              within 24 hours.
            </p>

            <div className="contact-items">
              {contactInfo.map((item, i) => (
                <div className="contact-item" key={i}>
                  <div className="contact-item-icon">{item.icon}</div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-map-placeholder">
              <span>
                🗺️ At. Ghodgaon Tal. Chopda Dist. Jalgaon, Maharashtra 425108
              </span>
            </div>
          </div>

          {/* Message Form */}
          <div className="card contact-form-card">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Full name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="10-digit mobile number"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="form-control"
                  rows={5}
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "13px",
                }}
                disabled={loading}
              >
                {loading ? "⏳ Sending..." : "✉️ Send Message"}
              </button>
            </form>
          </div>
        </div>
        {/* Location Section */}
        <div className="map-section">
          <h2 className="section-title" style={{ marginBottom: "32px" }}>
            📍Our Shop Location
          </h2>

          <div className="map-container">
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.881071846521!2d75.1106674!3d21.2365641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd8d783577c0427%3A0x9aea5d3ad8ea8a9!2sPrachi%20Online%20Services!5e0!3m2!1sen!2sin!4v1774539677773!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
