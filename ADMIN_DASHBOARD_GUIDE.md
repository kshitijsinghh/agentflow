# Admin Dashboard Integration Guide

This guide shows how to add the admin dashboard to your React app so you can view all leads.

## Option 1: Simple Integration (Recommended)

### Step 1: Update your App.js

Replace your `src/App.js` with this:

```javascript
import React, { useState } from 'react';
import LandingPage from './landing-page';
import AdminDashboard from './AdminDashboard';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  // Check URL for /admin
  React.useEffect(() => {
    if (window.location.pathname === '/admin') {
      setShowAdmin(true);
    }
  }, []);

  // Listen for route changes
  React.useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/admin') {
        setShowAdmin(true);
      } else {
        setShowAdmin(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const goToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setShowAdmin(true);
  };

  const backToHome = () => {
    window.history.pushState({}, '', '/');
    setShowAdmin(false);
  };

  return showAdmin ? (
    <AdminDashboard onBackClick={backToHome} />
  ) : (
    <LandingPage />
  );
}

export default App;
```

### Step 2: Update AdminDashboard.jsx

Add this near the top of the AdminDashboard component:

```javascript
export default function AdminDashboard({ onBackClick }) {
  // ... rest of component ...
  
  // Add a back button somewhere (like in the header):
  <button onClick={onBackClick} className="...">
    ← Back to Landing Page
  </button>
}
```

### Step 3: Add Admin Link to Landing Page

In `landing-page.jsx`, add this secret admin link in the footer:

```javascript
{/* Hidden admin link - add to footer */}
<a href="/admin" className="text-slate-600 hover:text-slate-500 text-xs">
  admin
</a>
```

Or add a keyboard shortcut:

```javascript
React.useEffect(() => {
  const handleKeyPress = (e) => {
    // Press Ctrl+Shift+A to go to admin
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      window.location.href = '/admin';
    }
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

---

## Option 2: Separate Admin Site

Deploy the admin dashboard as a completely separate site.

### On Render:

1. Create new Python app:
   ```python
   # admin.py
   from flask import Flask, send_from_directory
   
   app = Flask(__name__, static_folder='admin_build')
   
   @app.route('/')
   def serve():
       return send_from_directory('admin_build', 'index.html')
   
   if __name__ == '__main__':
       app.run()
   ```

2. Build React admin separately:
   ```bash
   npx create-react-app admin-app
   # Copy AdminDashboard.jsx into it
   npm run build
   ```

3. Deploy to Render with the build folder

4. Access at: `https://agentflow-admin.onrender.com`

---

## Option 3: Password Protected Admin Page

Create a protected route in Flask:

```python
# In app.py
from flask import render_template

@app.route('/admin')
def admin_dashboard():
    return render_template('admin.html')
```

Then create `templates/admin.html` with HTML version of admin dashboard.

---

## Accessing Your Admin Dashboard

### URL-based Access:
```
https://yourdomain.com/admin
```

### Keyboard Shortcut:
Press `Ctrl + Shift + A` to go to admin (if you added the shortcut above)

### Password Protection:
Enter your admin password (default: `your-secure-password`)

---

## What You Can Do in Admin Dashboard

✅ View all demo requests in a table
✅ See name, email, phone, website, date submitted
✅ Click email to send email directly
✅ Click phone to call directly  
✅ Click website to view their site
✅ Export all leads to CSV
✅ Delete individual leads
✅ Filter and sort (easy to add)

---

## Customizing the Admin Dashboard

### Change the password:

In `app.py`:
```python
os.getenv('ADMIN_PASSWORD', 'your-new-password')
```

Or set environment variable in Vercel/Render:
- Key: `ADMIN_PASSWORD`
- Value: `your-super-secure-password`

### Add more features:

The AdminDashboard.jsx is a React component, so you can:

1. **Add search/filter:**
```javascript
const [searchTerm, setSearchTerm] = useState('');
const filtered = leads.filter(lead => 
  lead.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

2. **Add date range filter:**
```javascript
const filtered = leads.filter(lead => {
  const date = new Date(lead.created_at);
  return date >= startDate && date <= endDate;
});
```

3. **Add email feature:**
```javascript
const sendEmail = async (email) => {
  window.location.href = `mailto:${email}?subject=AgentFlow%20Demo`;
};
```

4. **Add SMS feature:**
```javascript
const sendSMS = async (phone) => {
  window.location.href = `sms:${phone}?body=Hi!%20Let's%20schedule%20your%20demo`;
};
```

5. **Add follow-up status:**
Add a `status` column to your database and track:
- New
- Contacted
- Demo Scheduled
- Won
- Lost

---

## Securing Your Admin Dashboard

### 1. Use strong password:
```
✅ Good: "AgentFlow2025!xYz@Secure#"
❌ Bad: "admin123" or "password"
```

### 2. Change default password:
Don't use the default password in production!

### 3. Limit access:
Only share password with team members who need it

### 4. Add IP whitelist (Advanced):
In Render/Vercel, restrict dashboard to specific IPs

### 5. Use OAuth (Advanced):
Integrate GitHub/Google login instead of password

---

## Backing Up Your Leads

### Option 1: Export to CSV
1. Go to admin dashboard
2. Click "Export to CSV"
3. Opens in Excel/Google Sheets
4. Save to your computer

### Option 2: Download database directly
1. On Render, use file explorer
2. Download `demo_requests.db`
3. Keep safe backup copy

### Option 3: Scheduled exports
Add cron job to auto-export daily CSV to your email

---

## Integrating with CRM

### Send leads to Zapier:
1. Sign up at zapier.com
2. Create Zap: Flask → your CRM
3. Every new lead → add to CRM automatically

### Manual CRM sync:
1. Export to CSV
2. Import into Salesforce/HubSpot
3. Update daily

### Direct API integration:
Add this to your Flask endpoint:
```python
# Send to Pipedrive, Salesforce, HubSpot, etc.
import requests

def send_to_pipedrive(name, email, phone):
    requests.post(
        'https://api.pipedrive.com/v1/persons',
        json={'name': name, 'email': email, 'phone': phone},
        params={'api_token': os.getenv('PIPEDRIVE_API_TOKEN')}
    )
```

---

## Next Steps

1. ✅ Deploy landing page + admin dashboard
2. ✅ Test admin login
3. ✅ Submit test lead
4. ✅ View in admin dashboard
5. ✅ Export to CSV
6. ✅ Start collecting real leads!

---

## Troubleshooting Admin Dashboard

**"Cannot connect to backend"**
- Check REACT_APP_API_URL environment variable
- Make sure backend URL is correct
- Check CORS is enabled in app.py

**"Invalid password"**
- Check you're using correct password
- Make sure environment variable is set
- Try default password: `your-secure-password`

**"No leads showing"**
- Make sure leads were submitted (check backend logs)
- Refresh page
- Check database file exists
- Try submitting test lead

**"Cannot export CSV"**
- Check all leads have data in all fields
- Refresh page and try again
- Check browser console for errors

---

That's it! You now have a full admin dashboard to manage all your leads. 🎉

Questions? Check the main README.md or DEPLOYMENT_GUIDE.md
