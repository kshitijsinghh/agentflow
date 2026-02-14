import React, { useState } from 'react';
import { ArrowRight, Zap, BarChart3, Clock, CheckCircle, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    guests: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        setFormData({ name: '', email: '', phone: '', website: '', guests: '' });
        setTimeout(() => setShowBookingModal(false), 2000);
      } else {
        setSubmitMessage(data.error || 'Error booking demo. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Error: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Zap className="w-8 h-8 text-amber-400" />
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">AgentFlow</span>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-amber-400 transition"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          <div className={`absolute md:relative top-full md:top-auto left-0 md:left-auto right-0 md:right-auto w-full md:w-auto bg-slate-900/95 md:bg-transparent md:backdrop-blur-0 backdrop-blur ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
            <div className="flex flex-col md:flex-row gap-6 p-6 md:p-0 md:gap-8 md:items-center">
              <a href="#features" className="hover:text-amber-400 transition">Features</a>
              <a href="#benefits" className="hover:text-amber-400 transition">Benefits</a>
              <a href="#pricing" className="hover:text-amber-400 transition">Pricing</a>
              <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-400/50 transition w-full md:w-auto"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm font-semibold">
            ✨ Powered by Advanced AI Agents
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fadeIn">
            Automate Your <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent">Spreadsheets</span> in Seconds
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Stop wasting hours on repetitive Excel and Google Sheets tasks. Our intelligent AI agents handle data entry, analysis, reporting, and complex automation—instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => setShowBookingModal(true)}
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/50 transition flex items-center justify-center gap-2 group"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <button className="border-2 border-slate-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:border-amber-400 hover:text-amber-400 transition">
              Watch Demo
            </button>
          </div>

          <p className="text-slate-400 text-sm mt-8 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            No credit card required. 14-day free trial. Trusted by 500+ teams.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-16 relative">
          <div className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-slate-600/50 rounded-xl p-8 backdrop-blur-sm">
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-slate-600/30">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto text-amber-400/50 mb-4" />
                <p className="text-slate-400">Your spreadsheet automation demo appears here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Savings Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Save Hundreds of Hours</h2>
          <p className="text-center text-slate-300 text-lg max-w-2xl mx-auto mb-16">
            Real productivity gains from real customers
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { time: '15 hours/week', task: 'Manual data entry eliminated', icon: '📊' },
              { time: '8 hours/week', task: 'Report generation automated', icon: '📈' },
              { time: '12 hours/week', task: 'Data analysis & validation', icon: '✅' }
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-slate-800/80 border border-slate-700 rounded-lg p-8 hover:border-amber-400/50 transition">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-3xl font-bold text-amber-400 mb-2">{item.time}</div>
                  <p className="text-slate-300">{item.task}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-slate-300 text-lg mb-16 max-w-2xl">
            Enterprise-grade automation, no coding required
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Intelligent Data Entry',
                desc: 'Extract, validate, and populate data from any source automatically',
                icon: '⚡'
              },
              {
                title: 'Real-time Analysis',
                desc: 'Generate insights and dashboards as data arrives',
                icon: '📊'
              },
              {
                title: 'Smart Workflows',
                desc: 'Chain operations together with simple, visual rules',
                icon: '🔄'
              },
              {
                title: 'Excel & Sheets Compatible',
                desc: 'Works seamlessly with your existing tools and processes',
                icon: '🔗'
              },
              {
                title: 'Error Detection',
                desc: 'Catch inconsistencies and anomalies before they become problems',
                icon: '🛡️'
              },
              {
                title: 'Team Collaboration',
                desc: 'Share agents and workflows with your entire team instantly',
                icon: '👥'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-amber-400/50 hover:bg-slate-800/80 transition group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6 bg-gradient-to-b from-slate-800/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Teams Choose AgentFlow</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">
            <div className="space-y-6">
              {[
                'Reduce human error by up to 99%',
                'Free up your team for strategic work',
                'Scale operations without hiring',
                'Improve data consistency and compliance',
                'Get started in minutes, not weeks'
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="mt-1 p-1.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex-shrink-0 group-hover:scale-110 transition">
                    <CheckCircle className="w-5 h-5 text-slate-900" />
                  </div>
                  <p className="text-lg text-slate-200">{benefit}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-slate-600/50 rounded-xl p-12 backdrop-blur-sm">
              <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-slate-600/30">
                <Clock className="w-20 h-20 text-amber-400/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-orange-400/5"></div>
        <div className="absolute top-10 left-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Reclaim Your Time?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of teams automating spreadsheets and saving thousands of hours every month.
          </p>

          <button 
            onClick={() => setShowBookingModal(true)}
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/50 transition inline-flex items-center gap-2 group mb-6"
          >
            Book Your Demo Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>

          <p className="text-slate-400 text-sm">
            14 days free. No credit card. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-amber-400" />
                <span className="font-bold">AgentFlow</span>
              </div>
              <p className="text-slate-400 text-sm">AI-powered spreadsheet automation.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Docs</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>&copy; 2025 AgentFlow. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-amber-400 transition">Twitter</a>
              <a href="#" className="hover:text-amber-400 transition">LinkedIn</a>
              <a href="#" className="hover:text-amber-400 transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Book a Demo</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-slate-900 hover:text-slate-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  Website <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-2">
                  Add Guests
                </label>
                <input
                  type="email"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
                  placeholder="guest@email.com (optional)"
                />
              </div>

              {submitMessage && (
                <div className={`p-3 rounded-lg text-center font-semibold ${submitMessage.includes('✓') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-400/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Booking...' : 'Book Demo'}
              </button>

              <p className="text-slate-400 text-xs text-center">
                We respect your privacy. We'll only use your info to schedule a demo.
              </p>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
