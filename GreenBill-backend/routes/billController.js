const Bill = require('../models/Bill');

exports.uploadBill = async (req,res)=>{
    const { units, amount, period, breakdown } = req.body;
    const bill = new Bill({ user:req.user.id, units, amount, period, breakdown });
    await bill.save();
    res.json({ message:'Bill uploaded', bill });
};

exports.getBills = async (req,res)=>{
    const bills = await Bill.find({ user:req.user.id }).sort({ uploadedAt:-1 });
    res.json(bills);
};
