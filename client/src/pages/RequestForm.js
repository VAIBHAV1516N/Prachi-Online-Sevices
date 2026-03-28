import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api";
import "./RequestForm.css";

const serviceOptions = [
  "Aadhar Card",
  "PAN Card",
  "Ration Card",
  "Bank Account Opening",
  "PM Kisan Registration",
  "Insurance (PMJJBY)",
  "Income Certificate",
  "Domicile Certificate",
  "Caste Certificate",
  "Scholarship Form",
  "Electricity Bill Payment",
  "Mobile/DTH Recharge",
  "Other",
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

const RequestForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiServices, setApiServices] = useState([]);

  useEffect(() => {
    API.get("/services")
      .then((res) => {
        if (res.data.data?.length)
          setApiServices(res.data.data.map((s) => s.name));
      })
      .catch(() => {});
  }, []);

  const allServices = apiServices.length ? apiServices : serviceOptions;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone))
      e.phone = "Enter a valid 10-digit mobile number";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.service) e.service = "Please select a service";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      await API.post("/request", form);
      setSubmitted(true);
      toast.success(
        "Request submitted successfully! We will contact you soon.",
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Submission failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="request-page">
        <div className="container">
          <div className="success-box">
            <div className="success-icon">✅</div>
            <h2>Request Submitted!</h2>
            <p>
              Thank you <strong>{form.name}</strong>! Your request for{" "}
              <strong>{form.service}</strong> has been received. We will contact
              you on <strong>{form.phone}</strong> soon.
            </p>
            <div className="success-actions">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setForm(initialForm);
                  setSubmitted(false);
                }}
              >
                Submit Another
              </button>
              <a href="/" className="btn btn-outline">
                Go Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="request-page">
      <div className="request-header">
        <div className="container">
          <h1>Request a Service</h1>
          <p>Fill out the form below and we'll process your request promptly</p>
        </div>
      </div>

      <div className="container">
        <div className="request-layout">
          {/* Info Panel */}
          <div className="request-info">
            <h3>What happens next?</h3>
            <div className="info-steps">
              {[
                { icon: "📝", text: "You submit the request form" },
                { icon: "📞", text: "We call you to confirm details" },
                { icon: "📂", text: "You bring required documents" },
                { icon: "✅", text: "Service is completed & delivered" },
              ].map((s, i) => (
                <div className="info-step" key={i}>
                  <span className="info-step-icon">{s.icon}</span>
                  <span>{s.text}</span>
                </div>
              ))}
            </div>
            <div className="info-contact">
              <p>
                📞 <strong>+91 89566-47264</strong>
              </p>
              <p>🕐 Mon–Sat: 9AM – 7PM</p>
            </div>
          </div>

          {/* Form */}
          <div className="card request-form-card">
            <h2>Service Request Form</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (Optional)</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="form-control"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Select Service *</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="form-control form-select"
                >
                  <option value="">-- Choose a service --</option>
                  {allServices.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="form-error">{errors.service}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Additional Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="form-control"
                  rows={3}
                  placeholder="Any specific details or queries..."
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
                {loading ? "⏳ Submitting..." : "📋 Submit Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
