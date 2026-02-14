# Quick Start - Local Development

## Running the project locally before deployment

### Prerequisites
- Node.js (from nodejs.org)
- Python 3.8+
- Git

### Backend Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask app
python app.py
```

Backend will run on: http://localhost:5000

### Frontend Setup (in a new terminal)

```bash
# Install Node dependencies
npm install

# Add Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start React development server
npm start
```

Frontend will run on: http://localhost:3000

### Update fetch URL for local development

In `landing-page.jsx`, change:
```javascript
const response = await fetch('/api/demo-request', {
```

To:
```javascript
const response = await fetch('http://localhost:5000/api/demo-request', {
```

### Test the form

1. Open http://localhost:3000
2. Click "Book a Demo"
3. Fill in the form with test data
4. Submit
5. Check that it says "Demo booked!" 
6. Check your Python terminal - should see new entry in database
7. Check the `demo_requests.db` file was created in your project folder

### Viewing submitted data

```python
import sqlite3

conn = sqlite3.connect('demo_requests.db')
c = conn.cursor()
c.execute('SELECT * FROM demo_requests')
rows = c.fetchall()

for row in rows:
    print(row)

conn.close()
```

---

## Deploying to Production

Once everything works locally, follow the DEPLOYMENT_GUIDE.md to deploy for free.

### Quick deployment checklist:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/agentflow.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy Frontend (Vercel)**
   - Go to vercel.com
   - Import your GitHub repo
   - Deploy with one click

3. **Deploy Backend (Render)**
   - Go to render.com
   - Create new Web Service
   - Connect your GitHub repo
   - Set start command: `gunicorn app:app`
   - Deploy

4. **Update frontend API URL**
   - In Vercel environment variables
   - Set: `REACT_APP_API_URL=https://your-render-url.onrender.com`

Done! 🚀
