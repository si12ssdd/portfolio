import Portfolio from '../models/Portfolio.js';
import { DEFAULT_PORTFOLIO } from '../data/defaultPortfolio.js';

// @desc    Get portfolio data

// @route   GET /api/portfolio
// @access  Public
export const getPortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create(DEFAULT_PORTFOLIO);
    }
    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ success: false, message: 'Server error fetching portfolio.' });
  }
};

// @desc    Update portfolio data
// @route   PUT /api/portfolio
// @access  Private (Admin)
export const updatePortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio(DEFAULT_PORTFOLIO);
    }

    // Merge request body details into the portfolio document
    if (req.body.personal) portfolio.personal = { ...portfolio.personal, ...req.body.personal };
    if (req.body.stats) portfolio.stats = { ...portfolio.stats, ...req.body.stats };
    if (req.body.skills) portfolio.skills = { ...portfolio.skills, ...req.body.skills };
    if (req.body.education) portfolio.education = { ...portfolio.education, ...req.body.education };
    if (req.body.certifications) portfolio.certifications = req.body.certifications;
    if (req.body.experience) portfolio.experience = req.body.experience;

    await portfolio.save();
    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ success: false, message: 'Server error updating portfolio.' });
  }
};
