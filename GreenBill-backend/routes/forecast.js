const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const bills = await Bill.find({ userId })
      .sort({ createdAt: -1 })
      .limit(6);

    if (!bills || bills.length === 0) {
      return res.json({ success: true, past: [], prediction: 0 });
    }

    const past = bills
      .map((b) => ({
        month: b.month,
        year: b.year,
        units: b.units || 0,
      }))
      .reverse();

    const totalUnits = past.reduce((sum, p) => sum + (p.units || 0), 0);
    const prediction = Math.round(totalUnits / past.length);

    res.json({ success: true, past, prediction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Forecast error" });
  }
});

module.exports = router;
