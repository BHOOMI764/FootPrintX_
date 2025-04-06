const express = require('express');
const cors = require('cors');   
const http = require('http');
const {Server } = require('socket.io');
const { Pool } = require('pg');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000' }
});

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'footprintx',
  password: 'bhoomi90#',
  port: 5432,
});

// Route to save calculation
app.post('/api/calculate', async (req, res) => {
  const { transportation, energy, waste, shopping, flights, totalEmissions } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO calculations (transportation, energy, waste, shopping, flights, total_emissions)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [transportation, energy, waste, shopping, flights, totalEmissions]
    );

    const newRecord = result.rows[0];
    io.emit('newCalculation', newRecord); // Broadcast real-time data
    res.status(200).json(newRecord);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route to get all calculations
app.get('/api/calculate', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM calculations ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});