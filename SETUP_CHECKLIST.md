# 🚀 Setup Checklist - AgentFlow Landing Page

Complete these steps in order to get your landing page live with demo booking!

---

## ✅ Phase 1: Local Setup (15 minutes)

- [ ] Download/clone all files from this package
- [ ] Create a folder: `agentflow-landing`
- [ ] Place all files in that folder
- [ ] Open terminal in the folder

### Backend Setup
- [ ] Install Python 3.8+ (if not already installed)
- [ ] Run: `python -m venv venv`
- [ ] Activate venv:
  - Windows: `venv\Scripts\activate`
  - Mac/Linux: `source venv/bin/activate`
- [ ] Run: `pip install -r requirements.txt`
- [ ] Run: `python app.py`
- [ ] See message "Running on http://localhost:5000"
- [ ] ✅ Leave this terminal running

### Frontend Setup
- [ ] Install Node.js from nodejs.org (if not already installed)
- [ ] Open NEW terminal in project folder
- [ ] Run: `npm install`
- [ ] Run: `npm install -D tailwindcss postcss autoprefixer`
- [ ] Run: `npx tailwindcss init -p`
- [ ] Run: `npm start`
- [ ] Browser opens to http://localhost:3000
- [ ] ✅ You should see the landing page!

---

## ✅ Phase 2: Local Testing (10 minutes)

- [ ] Click "Book a Demo" button
- [ ] Fill in the form:
  - Name: Test User
  - Email: test@example.com
  - Phone: +1 (555) 000-0000
  - Website: https://example.com
  - Guests: (leave blank)
- [ ] Click "Book Demo"
- [ ] See success message "✓ Demo booked!"
- [ ] Check your project folder for `demo_requests.db` file
- [ ] ✅ Database is working!

---

## ✅ Phase 3: GitHub Setup (5 minutes)

- [ ] Create GitHub account (github.com) if you don't have one
- [ ] Create new repository named `agentflow`
- [ ] In your project folder, run:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/agentflow.git
  git branch -M main
  git push -u origin main
  ```
- [ ] ✅ Code is on GitHub

---

## ✅ Phase 4: Deploy Frontend (Vercel) - 5 minutes

- [ ] Go to vercel.com
- [ ] Click "Sign Up" → "Continue with GitHub"
- [ ] Authorize Vercel
- [ ] Click "New Project"
- [ ] Select your `agentflow` repository
- [ ] Click "Import"
- [ ] In settings:
  - [ ] Environment Variables → Add `REACT_APP_API_URL`
  - [ ] Value: leave blank for now (add after backend deploys)
- [ ] Click "Deploy"
- [ ] Wait 1-2 minutes
- [ ] See "Congratulations! Your site is live"
- [ ] Copy your Vercel URL (example: `agentflow-abc123.vercel.app`)
- [ ] ✅ Frontend is live!

---

## ✅ Phase 5: Deploy Backend (Render) - 5 minutes

- [ ] Go to render.com
- [ ] Click "Sign Up" → "Continue with GitHub"
- [ ] Authorize Render
- [ ] Click "New +" → "Web Service"
- [ ] Connect your GitHub repository
- [ ] Fill in form:
  - [ ] **Name:** agentflow-api
  - [ ] **Runtime:** Python 3
  - [ ] **Build Command:** `pip install -r requirements.txt`
  - [ ] **Start Command:** `gunicorn app:app`
- [ ] Click "Create Web Service"
- [ ] Wait 3-5 minutes for deployment
- [ ] See "Your service is live"
- [ ] Copy your Render URL (example: `agentflow-api.onrender.com`)
- [ ] ✅ Backend is live!

---

## ✅ Phase 6: Connect Frontend to Backend

- [ ] Go back to Vercel project
- [ ] Settings → Environment Variables
- [ ] Add new variable:
  - [ ] **Key:** `REACT_APP_API_URL`
  - [ ] **Value:** `https://your-render-url.onrender.com` (from Phase 5)
- [ ] Click "Save"
- [ ] Vercel auto-redeploys
- [ ] Wait 1-2 minutes
- [ ] ✅ Connected!

---

## ✅ Phase 7: Test Production

- [ ] Open your Vercel URL in browser
- [ ] Click "Book a Demo"
- [ ] Fill in test form
- [ ] Submit
- [ ] See success message
- [ ] ✅ Everything works!

---

## ✅ Phase 8: Setup Admin Dashboard (Optional but Recommended)

- [ ] In Vercel, create another environment variable:
  - [ ] **Key:** `REACT_APP_ADMIN_URL`
  - [ ] **Value:** `/admin`
- [ ] Add this to your `src/App.js`:
  ```javascript
  import AdminDashboard from './AdminDashboard';
  
  // Add route to show admin at /admin
  ```
- [ ] Or create separate admin site on Render
- [ ] ✅ Can view all leads!

---

## ✅ Phase 9: Custom Domain (Optional - Costs ~$5/year)

- [ ] Purchase domain from:
  - [ ] Freenom.com (free .tk domain)
  - [ ] Or Namecheap (~$5/year for .com)
- [ ] Go to Vercel project settings
- [ ] Domains → Add custom domain
- [ ] Follow DNS setup instructions
- [ ] Wait 24-48 hours for propagation
- [ ] ✅ Your custom domain is live!

---

## ✅ Phase 10: Collect Leads!

- [ ] Share your landing page URL with prospects
- [ ] Marketing emails with link
- [ ] LinkedIn posts
- [ ] Twitter/X
- [ ] Product Hunt
- [ ] Get your first 10 leads
- [ ] ✅ Start demos!

---

## 📋 Troubleshooting Quick Links

Problem | Solution
--------|----------
"Cannot POST /api/demo-request" | Check `REACT_APP_API_URL` is set in Vercel
Backend goes offline | Add uptime monitor at uptimerobot.com (FREE)
Form says error | Check browser console (F12) for error details
Can't deploy | Make sure all files are in GitHub
DNS not working | Wait 24-48 hours, try clearing cache

---

## 🎉 You Did It!

You now have:
- ✅ Production landing page deployed
- ✅ Backend API handling form submissions
- ✅ SQLite database storing leads
- ✅ Admin dashboard to view leads
- ✅ 100% FREE hosting
- ✅ Custom domain (optional)

**Next:** Start collecting leads and booking demos! 🚀

---

## 📞 Quick Reference

Your Live URLs:
- **Landing Page:** `https://your-vercel-url.vercel.app`
- **Backend API:** `https://your-render-url.onrender.com`
- **Admin Dashboard:** `https://your-vercel-url.vercel.app/admin`

Your Admin Password:
- Default: `your-secure-password`
- Change in Vercel environment variables

---

**Everything stuck?** Read the files in this order:
1. QUICK_START.md - Local development
2. DEPLOYMENT_GUIDE.md - Hosting details
3. README.md - Full documentation

Good luck! You've got this! 💪
