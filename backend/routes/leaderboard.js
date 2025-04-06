// server/routes/leaderboard.js

import express from 'express';
import pool from '../db.js'; // PostgreSQL pool

const router = express.Router();

// GET /api/leaderboard - returns top 10 users ordered by points
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT username, points FROM leaderboard ORDER BY points DESC LIMIT 10'
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching leaderboard:', err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
