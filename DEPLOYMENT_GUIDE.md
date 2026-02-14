# AgentFlow Landing Page - Complete Deployment Guide

## Overview
This guide walks you through hosting your SaaS landing page with demo booking functionality completely for FREE.

**Tech Stack:**
- Frontend: React + Tailwind CSS
- Backend: Flask (Python)
- Database: SQLite
- Hosting: Free tier services

---

## 🚀 OPTION 1: EASIEST - Vercel + Render (Recommended)

### Part 1: Frontend Deployment on Vercel (FREE)

1. **Install Node.js** if you haven't already:
   - Download from: https://nodejs.org/
   - Choose the LTS version

2. **Prepare your project:**
   ```bash
   # Create a folder for your project
   mkdir agentflow-landing
   cd agentflow-landing
   
   # Initialize React app
   npx create-react-app .
   ```

3. **Replace the files:**
   - Delete: `src/App.js`, `src/App.css`, `src/index.css`
   - Copy the content from `landing-page.jsx` into `src/App.js`
   - Add to `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Install Tailwind CSS:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

5. **Update `tailwind.config.js`:**
   ```js
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

6. **Update `package.json` to point to backend:**
   ```json
   "proxy": "https://your-backend-url.onrender.com"
   ```

7. **Deploy to Vercel:**
   - Go to: https://vercel.com
   - Sign up with GitHub (click "Sign up")
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"
   - Done! Your site is live at a Vercel URL

---

### Part 2: Backend Deployment on Render (FREE)

1. **Push your backend to GitHub:**
   ```bash
   git init
   git add app.py requirements.txt
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/agentflow-backend.git
   git push -u origin main
   ```

2. **Deploy to Render:**
   - Go to: https://render.com
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Fill in the form:
     - **Name:** agentflow-api
     - **Runtime:** Python 3
     - **Build Command:** `pip install -r requirements.txt`
     - **Start Command:** `gunicorn app:app`
   - Click "Create Web Service"
   - Wait ~3-5 minutes for deployment
   - Copy your Render URL (looks like: `https://agentflow-api.onrender.com`)

3. **Update your Vercel frontend:**
   - Go to your Vercel project settings
   - Add environment variable:
     - Key: `REACT_APP_API_URL`
     - Value: `https://agentflow-api.onrender.com`
   - Update your fetch URLs in the React code to use `process.env.REACT_APP_API_URL`

---

## 🚀 OPTION 2: Railway.app (Even Easier)

Railway is arguably the easiest free option with 500 free compute hours/month.

1. **Deploy everything to Railway:**
   - Go to: https://railway.app
   - Sign up with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Railway auto-detects everything!

2. **Add environment variables:**
   - In Railway dashboard, go to Variables
   - Add: `ADMIN_PASSWORD=your-secure-password`

---

## 🚀 OPTION 3: Heroku (Free but needs payment method)

Heroku's free tier now requires a credit card, but won't charge if you stay within limits.

1. **Install Heroku CLI:**
   ```bash
   # Download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Deploy backend:**
   ```bash
   heroku login
   heroku create your-app-name
   git push heroku main
   ```

3. **For frontend, use Vercel (above)**

---

## 📊 Accessing Your Leads Database

### Via Admin Dashboard (create this):
Create a simple admin page at `/admin` to view all leads:

```javascript
// Add this to your React app
import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const fetchLeads = async (pwd) => {
    const response = await fetch('/api/demo-requests', {
      headers: { 'X-Admin-Password': pwd }
    });
    const data = await response.json();
    setLeads(data);
    setAuthenticated(true);
  };

  return (
    <div>
      {!authenticated ? (
        <input 
          type="password" 
          placeholder="Admin Password"
          onKeyPress={(e) => e.key === 'Enter' && fetchLeads(password)}
          onChange={(e) => setPassword(e.target.value)}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.website}</td>
                <td>{lead.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
```

### Via Database Download:
1. **Render:** SSH into your service and download `demo_requests.db`
2. **Railway:** Use Railway CLI to access files
3. **Vercel:** Database persists on Render backend

---

## 📧 Alternative: Store Leads in Email

If you prefer to receive leads via email instead of managing a database:

Replace the Flask endpoint with this:

```python
import smtplib
from email.mime.text import MIMEText

@app.route('/api/demo-request', methods=['POST'])
def submit_demo_request():
    data = request.get_json()
    
    # Send email
    email_body = f"""
    New Demo Request:
    Name: {data['name']}
    Email: {data['email']}
    Phone: {data['phone']}
    Website: {data['website']}
    Guests: {data.get('guests', 'None')}
    """
    
    # Use SendGrid, Mailgun, or Gmail SMTP
    send_email('your-email@gmail.com', email_body)
    
    return jsonify({'message': 'Request sent'}), 200
```

---

## ✅ Checklist

- [ ] Code ready (landing-page.jsx + app.py)
- [ ] GitHub account created
- [ ] Frontend pushed to GitHub
- [ ] Backend pushed to GitHub
- [ ] Vercel deployed (or Railway)
- [ ] Render deployed (or Railway)
- [ ] Environment variables set
- [ ] API URL updated in frontend
- [ ] Test the form submission
- [ ] Add custom domain (optional - see below)

---

## 🌐 Add Custom Domain (FREE)

1. **Get a free domain:**
   - Freenom.com - Free .tk, .ml, .ga domains
   - Or buy a cheap domain from Namecheap (~$5/year)

2. **Connect to Vercel:**
   - Go to Vercel project settings
   - Domains → Add custom domain
   - Follow the DNS setup instructions

3. **Done!** Your site is at your custom URL

---

## 💰 Cost Summary

- **Frontend (Vercel):** FREE
- **Backend (Render):** FREE (500 compute hours/month = plenty)
- **Database:** FREE (built-in SQLite)
- **Domain:** FREE (freenom.com) or $5/year cheap
- **Email:** FREE (if using SendGrid free tier)
- **Total:** $0-5/year

---

## 🔒 Security Tips

1. **Change the admin password:**
   - In your backend, set a strong password
   - Export as environment variable: `ADMIN_PASSWORD`

2. **Enable CORS properly:**
   - Only allow your Vercel domain
   - Update `CORS(app)` to:
   ```python
   CORS(app, resources={
     r"/api/*": {"origins": ["https://yourdomain.com"]}
   })
   ```

3. **Validate all inputs:**
   - Never trust client data
   - Validate email, phone format
   - Sanitize all inputs before DB

---

## 🚨 Troubleshooting

**"Cannot POST /api/demo-request"**
- Check the proxy URL in package.json
- Ensure backend is deployed and running
- Check CORS settings

**"Backend not responding"**
- Render free tier apps go to sleep after 15 mins of inactivity
- Add an uptime monitor: https://uptimerobot.com (FREE)

**"Database connection error"**
- Ensure `demo_requests.db` file exists
- Check file permissions
- Use Railway/Render file storage instead

---

## 🎯 Next Steps

1. Deploy today using the steps above
2. Test form submission
3. Collect 10-20 leads
4. Schedule demos
5. Iterate on landing page copy
6. Add more features (pricing page, testimonials, etc.)

Good luck! 🚀
