const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio'); // Import the Portfolio model
const auth = require('../middleware/auth'); // --- 1. IMPORT THE MIDDLEWARE ---

// @route   GET api/portfolio
// @desc    Get all portfolio data
// @access  Public
router.get('/', async (req, res) => {
  try {
    // We find the one document by its uniqueId
    let portfolio = await Portfolio.findOne({ uniqueId: 'myPortfolio' });

    // If it doesn't exist yet, create it with default values
    if (!portfolio) {
      portfolio = new Portfolio();
      await portfolio.save();
    }

    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/portfolio
// @desc    Update portfolio data
// @access  Private (Admin Only)
// @route   PUT api/portfolio
// @desc    Update portfolio data
// @access  Private (Admin Only)
// --- 2. ADD 'auth' MIDDLEWARE HERE ---
router.put('/', auth, async (req, res) => { // 'auth' is now correctly included
  // Now, this code will ONLY run if the 'auth' middleware calls next()
  
  try {
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { uniqueId: 'myPortfolio' },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(updatedPortfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   PUT api/portfolio
// @desc    Update portfolio data
// @access  Private (Admin Only)
// --- 2. ADD 'auth' MIDDLEWARE HERE ---
router.put('/', auth, async (req, res) => {
  // Now, this code will ONLY run if the 'auth' middleware calls next()
  
  try {
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { uniqueId: 'myPortfolio' },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(updatedPortfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;