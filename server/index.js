const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection Configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
};

// Create Connection
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Server');

    // Create Database if it doesn't exist
    const dbName = process.env.DB_NAME || 'arshith_group';
    connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``, (err) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log(`Database "${dbName}" verified/created`);

        // Switch to the database
        connection.query(`USE \`${dbName}\``, (err) => {
            if (err) {
                console.error('Error switching to database:', err);
                return;
            }

            // Create table if it doesn't exist
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS internship_applications (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    mobile VARCHAR(20) NOT NULL,
                    degree VARCHAR(255) NOT NULL,
                    domain VARCHAR(255) NOT NULL,
                    months INT NOT NULL,
                    type VARCHAR(50) NOT NULL,
                    queries TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            connection.query(createTableQuery, (err) => {
                if (err) console.error('Error creating table:', err);
                else console.log('Table "internship_applications" verified/created');
            });
        });
    });
});

// API Endpoint to handle application submission
app.post('/api/apply', (req, res) => {
    console.log('Received application request:', req.body);
    const { name, email, mobile, degree, domain, otherDomain, months, type, queries } = req.body;
    
    // Use otherDomain if domain is 'Other'
    const finalDomain = domain === 'Other' ? otherDomain : domain;

    const query = 'INSERT INTO internship_applications (name, email, mobile, degree, domain, months, type, queries) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [name, email, mobile, degree, finalDomain, months, type, queries];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        console.log('Application saved to DB with ID:', result.insertId);
        res.status(200).json({ message: 'Application submitted successfully', id: result.insertId });
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
