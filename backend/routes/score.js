const express = require('express');
const Score = require('../models/Score');
const router = express.Router();

// Predefined list of valid songs
const predefinedSongs = [
  'ARISE by Juggernaut',
  'Innocent Azure by kuro',
  'DATAERR0R by Cosmograph',
  'ALTONA by SOUND HOLIC Vs. SWING HOLIC',
  'GIGA BABA(brz_style) by brz1128',
  'Blossom by Synthion',
];

// POST route to handle score submission
router.post('/submit-score', async (req, res) => {
  console.log('Received song', req.body.song);
  console.log('Session Data', req.session);
  if (!req.session.user) {
    return res.status(401).json({ message: 'You must be logged in to submit a score.' });
  }

  const { level, score, rank, song } = req.body;
  const userId = req.session.user._id; // Assuming session stores the logged-in user's ID

  // Validate request body
  if (!level || !score || !rank || !song) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!predefinedSongs.includes(song)) {
    return res.status(400).json({ error: 'Invalid song selection.' });
  }

  try {
    const newScore = new Score({
      level,
      score,
      rank,
      song,
      userId,
    });

    await newScore.save();
    res.status(201).json({ message: 'Score submitted successfully', score: newScore });
  } catch (err) {
    console.error('Error submitting score:', err);
    res.status(500).json({ message: 'Failed to submit score', error: err });
  }
});

// GET route to fetch leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    // Sort by level (descending), and if levels are the same, by score (descending)
    const leaderboard = await Score.find()
      .sort({ level: -1, score: -1 })
      .limit(10); // Limit to top 10 scores

    let userScore = null;
    if (req.session.user) {
      // Fetch the logged-in user's score
      userScore = await Score.findOne({ userId: req.session.user._id });
    }

    res.status(200).json({ leaderboard, userScore });
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ message: 'Failed to fetch leaderboard', error: err });
  }
});

module.exports = router;
