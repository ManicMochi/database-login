const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ManicMochi05!',
  database: 'user_auth' // ← make sure this is exactly right
});

db.connect(err => {
    if (err) {
      console.error('MySQL connection error:', err);
    } else {
      console.log('Connected to MySQL');
    }
  });  

  app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
  
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'User registered' });
    });
  });
  
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(401).json({ error: 'User not found' });
  
      const user = results[0];
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    });
  });
app.listen(3001, () => console.log('Server running on port 3001'));
