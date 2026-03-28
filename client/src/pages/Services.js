import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import './Services.css';

const fallbackServices = [
  { _id: '1', name: 'Aadhar Card', price: 50, description: 'New enrollment, corrections, address & biometric updates.', category: 'Government' },
  { _id: '2', name: 'PAN Card', price: 110, description: 'Apply for new PAN card or make name/DOB corrections.', category: 'Government' },
  { _id: '3', name: 'Ration Card', price: 30, description: 'New ration card, member addition & family modification.', category: 'Government' },
  { _id: '4', name: 'Bank Account Opening', price: 0, description: 'Zero-balance Jan Dhan & savings account opening.', category: 'Banking' },
  { _id: '5', name: 'PM Kisan Registration', price: 0, description: 'Registration for PM Kisan Samman Nidhi Yojana.', category: 'Government' },
  { _id: '6', name: 'Insurance (PMJJBY)', price: 20, description: 'Pradhan Mantri Jeevan Jyoti Bima Yojana enrollment.', category: 'Insurance' },
  { _id: '7', name: 'Income Certificate', price: 60, description: 'Application and processing of income certificates.', category: 'Government' },
  { _id: '8', name: 'Domicile Certificate', price: 60, description: 'Apply for domicile/residence certificate online.', category: 'Government' },
  { _id: '9', name: 'Scholarship Form', price: 40, description: 'Maharashtra state scholarship form filling & submission.', category: 'Education' },
  { _id: '10', name: 'Electricity Bill Payment', price: 10, description: 'Pay MSEDCL & other utility bills quickly.', category: 'Utility' },
  { _id: '11', name: 'Mobile/DTH Recharge', price: 5, description: 'Recharge any mobile number or DTH service.', category: 'Utility' },
  { _id: '12', name: 'Caste Certificate', price: 80, description: 'SC/ST/OBC/NT caste certificate application.', category: 'Government' },
];

const categoryColors = {
  Government: '#dbeafe',
  Banking: '#d1fae5',
  Insurance: '#fce7f3',
  Utility: '#fef3c7',
  Education: '#ede9fe',
  Other: '#f1f5f9',
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Government', 'Banking', 'Insurance', 'Utility', 'Education'];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get('/services');
        setServices(res.data.data.length ? res.data.data : fallbackServices);
      } catch {
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filtered = filter === 'All' ? services : services.filter(s => s.category === filter);

  return (
    <div>
      {/* Header */}
      <div className="services-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Government-authorized digital services at affordable prices</p>
        </div>
      </div>

      <div className="container section">
        {/* Filter Tabs */}
        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-tab ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="spinner" />
        ) : (
          <>
            <p className="results-count">{filtered.length} services found</p>
            <div className="grid-3">
              {filtered.map(service => (
                <div className="svc-card" key={service._id}>
                  <div className="svc-category" style={{ background: categoryColors[service.category] || '#f1f5f9' }}>
                    {service.category || 'Other'}
                  </div>
                  <h3 className="svc-name">{service.name}</h3>
                  <p className="svc-desc">{service.description}</p>
                  <div className="svc-footer">
                    <div className="svc-price">
                      {service.price === 0 ? '🆓 Free' : `₹${service.price}`}
                    </div>
                    <Link to="/request" className="btn btn-primary btn-sm">
                      Request →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CTA Banner */}
        <div className="services-cta">
          <div>
            <h3>Don't see what you need?</h3>
            <p>Contact us and we'll help you with your specific requirement.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
