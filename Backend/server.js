/*
const http = require('http');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'simple_login',
  port: 3307
});

db.connect(err => {
  if (err) {
    console.log('DB error:', err);
    return;
  }
  console.log('MySQL connected');
});

const server = http.createServer((req, res) => {

  // ✅ CORS HEADERS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/login') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const data = JSON.parse(body);

      const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
      db.query(sql, [data.username, data.email], err => {
        if (err) {
          res.writeHead(500);
          res.end('Database error');
          return;
        }
        res.writeHead(200);
        res.end('Saved successfully');
      });
    });

  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
8/
*/
const http = require('http');
const mysql = require('mysql2');
const crypto = require('crypto');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'simple_login',
  port: 3307
});

db.connect(() => console.log('MySQL Connected'));

const server = http.createServer((req, res) => {

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk.toString());

  req.on('end', () => {

    if (req.method === 'POST' && req.url === '/signup') {
      const { name, email, password, mobile } = JSON.parse(body);
      const otp = Math.floor(100000 + Math.random() * 900000);

      const sql = `
        INSERT INTO customers (name, email, password, mobile, otp)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(sql, [name, email, password, mobile, otp], err => {
        if (err) {
          res.writeHead(500);
          res.end('User already exists');
          return;
        }

        console.log('OTP (demo):', otp); // later send via SMS/email
        res.writeHead(200);
        res.end('OTP sent successfully');
      });
    }

    else if (req.method === 'POST' && req.url === '/verify-otp') {
      const { email, otp } = JSON.parse(body);

      const sql = `
        UPDATE customers SET is_verified = TRUE
        WHERE email = ? AND otp = ?
      `;

      db.query(sql, [email, otp], (err, result) => {
        if (result.affectedRows === 0) {
          res.writeHead(400);
          res.end('Invalid OTP');
        } else {
          res.writeHead(200);
          res.end('Signup successful');
        }
      });
    }

    else {
      res.writeHead(404);
      res.end('Not found');
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
