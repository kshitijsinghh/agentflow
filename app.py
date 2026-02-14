import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database setup
DB_FILE = 'demo_requests.db'

def init_db():
    """Initialize the database with demo_requests table"""
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS demo_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            guests TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

@app.route('/api/demo-request', methods=['POST'])
def submit_demo_request():
    """Handle demo booking form submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Insert into database
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('''
            INSERT INTO demo_requests (name, email, phone, guests)
            VALUES (?, ?, ?, ?)
        ''', (
            data['name'],
            data['email'],
            data['phone'],
            data.get('guests', '')
        ))
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'Demo request submitted successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/demo-requests', methods=['GET'])
def get_all_demo_requests():
    """Retrieve all demo requests (with optional password protection)"""
    try:
        # Optional: Add simple password protection
        password = request.headers.get('X-Admin-Password')
        if password != os.getenv('ADMIN_PASSWORD', 'your-secure-password'):
            return jsonify({'error': 'Unauthorized'}), 401
        
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('SELECT * FROM demo_requests ORDER BY created_at DESC')
        rows = c.fetchall()
        conn.close()
        
        # Format as JSON
        demo_requests = []
        columns = ['id', 'name', 'email', 'phone', 'guests', 'created_at']
        for row in rows:
            demo_requests.append(dict(zip(columns, row)))
        
        return jsonify(demo_requests), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/demo-requests/<int:request_id>', methods=['DELETE'])
def delete_demo_request(request_id):
    """Delete a specific demo request"""
    try:
        password = request.headers.get('X-Admin-Password')
        if password != os.getenv('ADMIN_PASSWORD', 'your-secure-password'):
            return jsonify({'error': 'Unauthorized'}), 401
        
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('DELETE FROM demo_requests WHERE id = ?', (request_id,))
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'Demo request deleted'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
