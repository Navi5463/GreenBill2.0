const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const Bill = require("../models/Bill");
const authMiddleware = require("../middleware/authMiddleware");



const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage }).single("file");


router.get("/", authMiddleware, async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(bills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching bills" });
  }
});

router.post("/upload", authMiddleware, (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    try {
      const { month, year, amount, units } = req.body;

      if (!req.file)
        return res.status(400).json({ message: "No file uploaded" });

     
      if (!month || !year || !amount || !units)
        return res.status(400).json({ message: "All fields are required" });

      const newBill = new Bill({
        userId: req.user.id,
        month,       
        year,
        amount,
        units,
        fileUrl: `/uploads/${req.file.filename}`,
        date: new Date(),
      });

      await newBill.save();
      res.status(201).json({ message: "✅ Bill uploaded successfully", bill: newBill });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const billId = req.params.id;
    const bill = await Bill.findOne({ _id: billId, userId: req.user.id });
    if (!bill) return res.status(404).json({ message: "Bill not found" });

   
    const filePath = bill.fileUrl?.startsWith("/") ? bill.fileUrl.slice(1) : bill.fileUrl;
    if (filePath) {
      fs.unlink(filePath, (err) => {
        if (err) console.warn("File delete error:", err.message);
      });
    }

    await bill.deleteOne();
    res.json({ message: "✅ Bill deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/latest/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const bill = await Bill.findOne({ userId }).sort({ createdAt: -1 });
    if (!bill) return res.json({ success: false, message: "No bills found" });
    res.json({ success: true, bill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/forecast/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const bills = await Bill.find({ userId }).sort({ year: 1, month: 1 });
    if (!bills.length) return res.json({ success: false, message: "No bills" });

    
    const monthIndex = m => ["January","February","March","April","May","June","July","August","September","October","November","December"].indexOf(m);

    const x = bills.map((b,i)=>i); 
    const y = bills.map(b=>b.units);

  
    const n = x.length;
    const sumX = x.reduce((a,b)=>a+b,0);
    const sumY = y.reduce((a,b)=>a+b,0);
    const sumXY = x.reduce((a,b,i)=>a+b*y[i],0);
    const sumX2 = x.reduce((a,b)=>a+b*b,0);

    const b = (n*sumXY - sumX*sumY)/(n*sumX2 - sumX*sumX) || 0;
    const a = (sumY - b*sumX)/n;

    const nextX = x.length;
    const prediction = Math.max(0, Math.round(a + b*nextX));

    res.json({
      success: true,
      past: bills.map(b=>({month:b.month,year:b.year,units:b.units})),
      prediction
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

