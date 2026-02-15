import React, { useState } from 'react';
import { ArrowRight, Zap, Menu, X } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
    color: 'white',
    overflow: 'hidden',
  },
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 50,
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  button: {
    background: 'linear-gradient(to right, #fbbf24, #f97316)',
    color: '#0f172a',
    padding: '0.5rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '1rem',
  },
  heroSection: {
    paddingTop: '8rem',
    paddingBottom: '5rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '56rem',
    margin: '0 auto',
  },
  heroH1: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: '1.5rem',
    marginTop: '1.5rem',
  },
  heroP: {
    fontSize: '1.125rem',
    color: '#cbd5e1',
    marginBottom: '2rem',
    lineHeight: 1.6,
    maxWidth: '40rem',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  statsSection: {
    padding: '5rem 1.5rem',
    background: 'rgba(30, 41, 59, 0.5)',
  },
  statsContainer: {
    maxWidth: '80rem',
    margin: '0 auto',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '4rem',
  },
  statCard: {
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid #334155',
    borderRadius: '0.75rem',
    padding: '2rem',
    transition: 'all 0.3s',
  },
  featureIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: '0.5rem',
  },
  featuresSection: {
    padding: '5rem 1.5rem',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '4rem',
  },
  featureCard: {
    background: 'rgba(30, 41, 59, 0.5)',
    border: '1px solid #334155',
    borderRadius: '0.75rem',
    padding: '2rem',
    transition: 'all 0.3s',
  },
  modal: {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '0.75rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    maxWidth: '28rem',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    background: 'linear-gradient(to right, #fbbf24, #f97316)',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    color: '#e2e8f0',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    background: 'rgba(71, 85, 105, 0.5)',
    border: '1px solid #475569',
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    color: 'white',
    fontSize: '1rem',
    fontFamily: 'inherit',
    transition: 'all 0.3s',
  },
};

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default function LandingPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSubmitMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage('');

    try {
      const response = await fetch(`${API_URL}/api/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('✓ Demo booked! We\'ll contact you soon.');
        setFormData({ name: '', email: '', phone: '', guests: '' });
        setTimeout(() => handleCloseModal(), 2000);
      } else {
        setSubmitMessage(data.error || 'Error booking demo. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Error: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <Zap size={32} color="#fbbf24" />
          <span style={{ background: 'linear-gradient(to right, #fcd34d, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Autosheet
          </span>
        </div>
        <button 
          onClick={() => setShowBookingModal(true)}
          style={styles.button}
        >
          Book a Demo
        </button>
      </nav>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', color: '#fcd34d', fontSize: '0.875rem', fontWeight: '600' }}>
            ✨ Powered by Advanced AI Agents
          </div>

          <h1 style={styles.heroH1}>
            Automate Your <span style={{ background: 'linear-gradient(to right, #fcd34d, #fb923c, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Spreadsheets</span> in Seconds
          </h1>

          <p style={styles.heroP}>
            Stop wasting hours on repetitive Excel and Google Sheets tasks. Our intelligent AI agents handle data entry, analysis, reporting, and complex automation—instantly.
          </p>

          <div style={styles.buttonContainer}>
            <button 
              onClick={() => setShowBookingModal(true)}
              style={{ ...styles.button, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Book a Demo
              <ArrowRight size={20} />
            </button>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '2rem' }}>
            No credit card required. 14-day free trial. Trusted by 500+ teams.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>Save Hundreds of Hours</h2>
          <p style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '1.125rem', maxWidth: '40rem', margin: '0 auto 4rem' }}>
            Real productivity gains from real customers
          </p>

          <div style={styles.statsGrid}>
            {[
              { time: '15 hours/week', task: 'Manual data entry eliminated', icon: '📊' },
              { time: '8 hours/week', task: 'Report generation automated', icon: '📈' },
              { time: '12 hours/week', task: 'Data analysis & validation', icon: '✅' }
            ].map((item, i) => (
              <div key={i} style={styles.statCard}>
                <div style={styles.featureIcon}>{item.icon}</div>
                <div style={styles.featureTitle}>{item.time}</div>
                <p style={{ color: '#cbd5e1' }}>{item.task}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.statsContainer}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Powerful Features</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.125rem', marginBottom: '4rem', maxWidth: '40rem' }}>
            Enterprise-grade automation, no coding required
          </p>

          <div style={styles.featureGrid}>
            {[
              { title: 'Intelligent Data Entry', desc: 'Extract, validate, and populate data from any source automatically', icon: '⚡' },
              { title: 'Real-time Analysis', desc: 'Generate insights and dashboards as data arrives', icon: '📊' },
              { title: 'Smart Workflows', desc: 'Chain operations together with simple, visual rules', icon: '🔄' },
              { title: 'Excel & Sheets Compatible', desc: 'Works seamlessly with your existing tools and processes', icon: '🔗' },
              { title: 'Error Detection', desc: 'Catch inconsistencies and anomalies before they become problems', icon: '🛡️' },
              { title: 'Team Collaboration', desc: 'Share agents and workflows with your entire team instantly', icon: '👥' }
            ].map((feature, i) => (
              <div key={i} style={styles.featureCard}>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>{feature.title}</h3>
                <p style={{ color: '#cbd5e1' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Ready to Reclaim Your Time?</h2>
        <p style={{ fontSize: '1.125rem', color: '#cbd5e1', marginBottom: '2rem', maxWidth: '40rem', margin: '0 auto 2rem' }}>
          Join hundreds of teams automating spreadsheets and saving thousands of hours every month.
        </p>

        <button 
          onClick={() => setShowBookingModal(true)}
          style={{ ...styles.button, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}
        >
          Book Your Demo Today
          <ArrowRight size={20} />
        </button>

        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          14 days free. No credit card. Cancel anytime.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #334155', background: 'rgba(15, 23, 42, 0.5)', padding: '3rem 1.5rem' }}>
        <div style={styles.statsContainer}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Zap size={24} color="#fbbf24" />
                <span style={{ fontWeight: 'bold' }}>Autosheet</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>AI-powered spreadsheet automation.</p>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Product</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Features</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Pricing</a></li>
                <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Security</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Blog</a></li>
                <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Docs</a></li>
                <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact</a></li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #334155', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>&copy; 2025 Autosheet. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Twitter</a>
              <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>LinkedIn</a>
              <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Booking Modal */}
      {showBookingModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>Book a Demo</h2>
              <button
                onClick={handleCloseModal}
                style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '2rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  placeholder="Your name"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Email <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  placeholder="your@email.com"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Phone Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  placeholder="+91 (123) 456-7890"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Add Guests
                </label>
                <input
                  type="email"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="guest@email.com (optional)"
                />
              </div>

              {submitMessage && (
                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center', fontWeight: '600', marginBottom: '1rem', background: submitMessage.includes('✓') ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: submitMessage.includes('✓') ? '#86efac' : '#fca5a5' }}>
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{ ...styles.button, width: '100%', opacity: loading ? 0.5 : 1 }}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>

              <p style={{ color: '#94a3b8', fontSize: '0.75rem', textAlign: 'center', marginTop: '1rem' }}>
                We respect your privacy. We'll only use your info to schedule a demo.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
