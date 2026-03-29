import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./Home.css";

const services = [
  {
    icon: "🪪",
    title: "Aadhar Card",
    desc: "New enrollment, corrections & updates",
  },
  {
    icon: "💳",
    title: "PAN Card",
    desc: "Apply for new PAN or make corrections",
  },
  {
    icon: "🏦",
    title: "Bank Services",
    desc: "Account opening, passbook, transfers",
  },
  {
    icon: "🌾",
    title: "Ration Card",
    desc: "New card, modifications & renewal",
  },
  {
    icon: "🛡️",
    title: "Insurance",
    desc: "PM Jan Arogya, life & crop insurance",
  },
  {
    icon: "🎓",
    title: "Education",
    desc: "Scholarships, certificates & forms",
  },
];

const fallbackGallery = [
  {
    _id: "1",
    url: "https://images.unsplash.com/photo-1606326608690-4e0281b1e588?w=600&q=80",
    caption: "Serving Customers Daily",
    category: "Customer Service",
  },
  {
    _id: "2",
    url: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80",
    caption: "Digital Document Services",
    category: "Documentation",
  },
  {
    _id: "3",
    url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    caption: "Government Form Assistance",
    category: "Government",
  },
  {
    _id: "4",
    url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    caption: "Banking & Financial Services",
    category: "Banking",
  },
  {
    _id: "5",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    caption: "Education & Scholarships",
    category: "Education",
  },
  {
    _id: "6",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    caption: "Insurance Enrollment Drive",
    category: "Insurance",
  },
];

const stats = [
  { value: "5000+", label: "Customers Served" },
  { value: "20+", label: "Services Available" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "5+", label: "Years Experience" },
];

const Home = () => {
  const [lightbox, setLightbox] = useState(null);
  const [galleryImages, setGalleryImages] = useState(fallbackGallery);

  useEffect(() => {
    API.get("/gallery")
      .then((res) => {
        if (res.data.data && res.data.data.length > 0) {
          setGalleryImages(res.data.data);
        }
      })
      .catch(() => {}); // silently use fallback
  }, []);
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">✅ Trusted CSC Provider</div>
          <h1>
            Digital Services at
            <br />
            <span className="hero-highlight">Your Doorstep</span>
          </h1>
          <p>
            Prachi Online Services brings all government & digital services to
            you — fast, affordable, and hassle-free.
          </p>
          <div className="hero-actions">
            <Link to="/request" className="btn btn-primary">
              📋 Request a Service
            </Link>
            <Link to="/services" className="btn btn-outline">
              View All Services
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card-float">
            <div className="float-icon">🏛️</div>
            <div>
              <div className="float-title">Prachi Online Services</div>
              <div className="float-sub">Common Service Center</div>
            </div>
          </div>
          <div className="hero-illustration">
            <div className="ill-circle ill-1"></div>
            <div className="ill-circle ill-2"></div>
            <div className="ill-circle ill-3"></div>
            <div className="ill-emoji">🇮🇳</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-item" key={i}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Government-authorized services delivered conveniently
          </p>
          <div className="grid-3">
            {services.map((s, i) => (
              <div className="service-card" key={i}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link to="/services" className="btn btn-primary">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get your service done in 3 simple steps
          </p>
          <div className="steps-grid">
            {[
              {
                step: "01",
                icon: "🔍",
                title: "Choose a Service",
                desc: "Browse our list of available services and pick what you need.",
              },
              {
                step: "02",
                icon: "📝",
                title: "Submit a Request",
                desc: "Fill in the simple online form with your basic details.",
              },
              {
                step: "03",
                icon: "✅",
                title: "Get It Done",
                desc: "Our team processes your request and updates you promptly.",
              },
            ].map((s, i) => (
              <div className="step-card" key={i}>
                <div className="step-number">{s.step}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section gallery-section">
        <div className="container">
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-subtitle">
            A glimpse into our services and community impact
          </p>
          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <div
                className="gallery-item"
                key={img._id || img.id}
                onClick={() => setLightbox(i)}
              >
                <img src={img.url} alt={img.alt} loading="lazy" />
                <div className="gallery-overlay">
                  <div className="gallery-category">{img.category}</div>
                  <div className="gallery-caption">{img.caption}</div>
                  <div className="gallery-zoom">🔍</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            ✕
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(
                (lightbox - 1 + galleryImages.length) % galleryImages.length,
              );
            }}
          >
            ‹
          </button>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightbox].url}
              alt={galleryImages[lightbox].alt}
            />
            <div className="lightbox-info">
              <span className="lightbox-cat">
                {galleryImages[lightbox].category}
              </span>
              <p>{galleryImages[lightbox].caption}</p>
              <span className="lightbox-counter">
                {lightbox + 1} / {galleryImages.length}
              </span>
            </div>
          </div>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % galleryImages.length);
            }}
          >
            ›
          </button>
        </div>
      )}

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Get Started?</h2>
            <p>
              Submit your service request online today — no waiting in queues!
            </p>
            <div className="cta-actions">
              <Link to="/request" className="btn btn-secondary">
                📋 Request Now
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline"
                style={{ borderColor: "white", color: "white" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
