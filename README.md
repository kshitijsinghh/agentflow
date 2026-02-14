# AgentFlow - AI Spreadsheet Automation SaaS Landing Page

Complete, production-ready landing page with demo booking form and lead database.

## 📦 What's Included

- ✅ Beautiful, conversion-focused landing page (React + Tailwind)
- ✅ "Book a Demo" modal with form capture
- ✅ Backend API with SQLite database
- ✅ Admin dashboard to view all leads
- ✅ Export leads to CSV
- ✅ Completely FREE to host
- ✅ Step-by-step deployment guide

## 🚀 Quick Start (5 minutes)

### 1. Setup Locally First

```bash
# Clone or download this project folder

# Install Node dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Create Python virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install Python dependencies
pip install -r requirements.txt
```

### 2. Run Locally

Terminal 1 - Backend:
```bash
source venv/bin/activate
python app.py
# Backend runs on http://localhost:5000
```

Terminal 2 - Frontend:
```bash
npm start
# Frontend runs on http://localhost:3000
```

### 3. Test the Form

1. Open http://localhost:3000
2. Click "Book a Demo" button
3. Fill in the form
4. Submit
5. Check the database: `demo_requests.db` file created in your project folder

## 📁 File Structure

```
agentflow-landing/
├── landing-page.jsx          # Main landing page component
├── AdminDashboard.jsx        # Admin panel to view leads
├── app.py                    # Flask backend API
├── package.json              # Node dependencies
├── requirements.txt          # Python dependencies
├── .gitignore                # Git ignore rules
├── DEPLOYMENT_GUIDE.md       # How to host for FREE
├── QUICK_START.md            # Local development guide
└── README.md                 # This file
```

## 🌐 Deploy to Production (FREE)

Follow **DEPLOYMENT_GUIDE.md** for detailed steps. Quick summary:

### Option 1: Vercel + Render (Recommended)

**Frontend (Vercel):**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Deploy with one click - FREE!

**Backend (Render):**
1. Go to https://render.com
2. Create new Web Service
3. Connect your GitHub repo
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `gunicorn app:app`
6. Deploy - FREE!

**Cost: $0/month**

### Option 2: Railway.app (Simplest)

1. Go to https://railway.app
2. Sign up with GitHub
3. Deploy - Railway auto-detects everything!
4. FREE tier includes 500 compute hours/month

**Cost: $0/month**

### Option 3: Heroku (Free but needs payment method)

1. Sign up at https://heroku.com
2. Install Heroku CLI
3. Follow standard Heroku deployment

**Cost: FREE (requires credit card)**

## 👨‍💼 View Your Leads

### Via Admin Dashboard
1. Open `/admin` on your deployed site
2. Enter your admin password (set in backend)
3. See all submitted leads in a table
4. Export to CSV with one click

### Via CSV Export
1. Login to admin dashboard
2. Click "Export to CSV"
3. Open in Excel/Google Sheets
4. Send demo invites to all leads!

### Via Database
The backend uses SQLite with a simple structure:
```
demo_requests
├── id (auto-increment)
├── name (text)
├── email (text)
├── phone (text)
├── website (text)
├── guests (text, optional)
└── created_at (timestamp)
```

## ⚙️ Customization

### Change Product Name
Replace "AgentFlow" with your product name throughout:
- `landing-page.jsx` - Logo and branding
- Update all feature descriptions
- Update footer links

### Update Features List
Edit the features section in `landing-page.jsx`:
```javascript
const features = [
  {
    title: 'Your Feature',
    desc: 'Feature description',
    icon: '🎯'
  },
  // Add more...
];
```

### Add More Sections
Add new sections between existing ones:
- Testimonials/Case Studies
- Pricing plans
- FAQ section
- Blog/Resources

### Change Colors
Tailwind classes use amber/orange by default. To change:
- Replace `amber-` with `blue-`, `green-`, `purple-`, etc.
- Update gradient colors
- Update button hover effects

### Add Google Analytics
Add to `landing-page.jsx`:
```javascript
import { useEffect } from 'react';

useEffect(() => {
  // Paste Google Analytics code here
}, []);
```

## 🔐 Security

### Change Admin Password
In `app.py`, update:
```python
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'change-me-to-something-strong')
```

Set environment variable on your hosting platform:
- Vercel: Project Settings → Environment Variables
- Render: Environment tab
- Railway: Variables section

### CORS Setup
Update the allowed domain in `app.py`:
```python
CORS(app, resources={
    r"/api/*": {"origins": ["https://yourdomain.com"]}
})
```

### Input Validation
The form validates:
- All required fields
- Email format
- Phone format
- URL format

All inputs are sanitized before database insertion.

## 🚨 Troubleshooting

**"Cannot POST /api/demo-request"**
- Backend not running or not deployed
- Check API URL in environment variables
- Check CORS is configured correctly
- Browser console will show specific error

**"Backend goes offline after 15 minutes"**
- Free Render tier puts app to sleep after inactivity
- Add uptime monitor at https://uptimerobot.com (FREE)
- Ping your backend every 15 minutes to keep alive

**"Database not persisting"**
- SQLite files don't persist on serverless
- Use Render/Railway file storage (included)
- Or switch to PostgreSQL free tier

**"Form says error but nothing shows"**
- Check browser console (F12)
- Check backend logs
- Verify CORS headers
- Test API directly with curl

## 📊 Analytics

To track conversions, add to the submit handler:
```javascript
// Send to analytics
if (window.gtag) {
  gtag('event', 'demo_booking', {
    'name': formData.name,
    'email': formData.email
  });
}
```

## 📧 Email Notifications

To get email when someone books a demo:

1. Add SendGrid integration to `app.py`:
```python
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

@app.route('/api/demo-request', methods=['POST'])
def submit_demo_request():
    # ... save to database ...
    
    # Send email
    message = Mail(
        from_email='noreply@yourdomain.com',
        to_emails='your-email@gmail.com',
        subject=f'New Demo Request: {data["name"]}',
        html_content=f'<p>Name: {data["name"]}</p>...'
    )
    SendGridAPIClient(os.getenv('SENDGRID_API_KEY')).send(message)
```

2. Get free SendGrid account: https://sendgrid.com
3. Set environment variable with API key
4. Get email for every lead!

## 🎯 Next Steps

1. ✅ Deploy the website
2. ✅ Collect first 10-20 demo requests
3. ✅ Schedule demos
4. ✅ Gather feedback
5. ✅ Iterate on copy and design
6. ✅ Add testimonials from early customers
7. ✅ Create pricing page
8. ✅ Build email nurture sequence

## 💬 Support

Having issues? Check:
1. DEPLOYMENT_GUIDE.md - Most common issues
2. QUICK_START.md - Local development
3. Browser console (F12) - JavaScript errors
4. Backend logs - API errors

## 📄 License

You own all the code. Use it however you want!

---

**Ready to launch?** Follow DEPLOYMENT_GUIDE.md now! 🚀
# agentflow
# agentflow
# agentflow
