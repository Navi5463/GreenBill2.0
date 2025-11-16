const mongoose = require("mongoose");


const ApplianceEstimateSchema = new mongoose.Schema({
  name: String,            
  units: Number,
  amount: Number,           
  percentage: Number,     
  confidence: Number        
});

const billSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

 
  month: { type: String },
  year: { type: String },
  amount: { type: Number },
  units: { type: Number },               
  fullText: { type: String },           
  description: { type: String },
  date: { type: Date, default: Date.now },
  fileUrl: { type: String },

  
  applianceEstimates: [ApplianceEstimateSchema],  
  analyzerConfidence: { type: Number },          
  questionnaire: { type: mongoose.Schema.Types.Mixed }, 
  analyzedAt: { type: Date },                    



 
},
);

module.exports = mongoose.model("Bill", billSchema);
