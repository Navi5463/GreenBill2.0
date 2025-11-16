const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const User = require('../models/User');
const analyzer = require('../utils/analyzer');


router.post('/bills/:billId/analyze', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId);
    if (!bill) return res.status(404).json({ error: 'Bill not found' });

    const { questionnaire, customPercentages, rules, units: reqUnits, amount: reqAmount } = req.body;
    const units = typeof bill.units === 'number' ? bill.units : Number(reqUnits);
    const amount = typeof bill.amount === 'number' ? bill.amount : Number(reqAmount);
    if (!units || !amount) return res.status(400).json({ error: 'units and amount required' });

    const result = analyzer.analyzeBill({ units, amount, questionnaire, customPercentages, rules });
    bill.applianceEstimates = result.applianceEstimates;
    bill.analyzerConfidence = result.overallConfidence;
    bill.analyzedAt = new Date();
    if (questionnaire) bill.questionnaire = questionnaire;
    await bill.save();

    res.json({ success: true, analysis: result, bill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/bills/:billId/award-points', async (req, res) => {
  try {
    const { points } = req.body;
    const bill = await Bill.findById(req.params.billId);
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    const user = await User.findById(bill.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const pts = Number(points) || 0;
    bill.greenPointsAwarded = (bill.greenPointsAwarded || 0) + pts;
    await bill.save();

    user.greenPoints = (user.greenPoints || 0) + pts;
    await user.save();

    res.json({ success: true, awarded: pts, userPoints: user.greenPoints });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const top = await User.find().sort({ greenPoints: -1 }).limit(10).select('name greenPoints');
    res.json({ success: true, leaderboard: top });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
