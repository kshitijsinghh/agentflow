import React, { useState } from 'react';
import { LogOut, Download, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/demo-requests`, {
        method: 'GET',
        headers: { 'X-Admin-Password': password }
      });

      if (response.ok) {
        const data = await response.json();
        setLeads(data);
        setAuthenticated(true);
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Error connecting to backend: ' + err.message);
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      const response = await fetch(`${API_URL}/api/demo-requests/${id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Password': password }
      });

      if (response.ok) {
        setLeads(leads.filter(lead => lead.id !== id));
      } else {
        setError('Error deleting lead');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Website', 'Guests', 'Date'];
    const csv = [
      headers.join(','),
      ...leads.map(lead => [
        lead.id,
        `"${lead.name}"`,
        lead.email,
        lead.phone,
        lead.website,
        `"${lead.guests}"`,
        lead.created_at
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `demo-requests-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-200 font-semibold mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-400/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Demo Requests ({leads.length})</h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Export Button */}
        <div className="mb-6">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition"
          >
            <Download className="w-5 h-5" />
            Export to CSV
          </button>
        </div>

        {/* Table */}
        {leads.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center text-slate-400">
            No demo requests yet
          </div>
        ) : (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Name</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Email</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Phone</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Website</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Guests</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Date</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-200">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, idx) => (
                    <tr key={lead.id} className={`border-b border-slate-700 ${idx % 2 === 0 ? 'bg-slate-700/20' : ''} hover:bg-slate-700/40 transition`}>
                      <td className="px-6 py-4">{lead.name}</td>
                      <td className="px-6 py-4">
                        <a href={`mailto:${lead.email}`} className="text-amber-400 hover:underline">
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a href={`tel:${lead.phone}`} className="text-amber-400 hover:underline">
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline truncate">
                          {lead.website}
                        </a>
                      </td>
                      <td className="px-6 py-4">{lead.guests || '-'}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-400 hover:text-red-300 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
