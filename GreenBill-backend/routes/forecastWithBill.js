const express = require('express');
const router = express.Router();

const forecastService = require('../services/forecastService'); 


router.get('/api/forecast/with-bill/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const forecastResult = await forecastService.getForecastForUser(userId);

   
    const forecastedUnits = forecastResult.forecastedUnits;

    
    return res.json({
      userId,
      forecast: forecastResult,
      forecastedUnits
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
