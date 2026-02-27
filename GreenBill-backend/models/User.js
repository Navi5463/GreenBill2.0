const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  greenPoints: { type: Number, default: 0 }, 

 
  avatarUrl: { type: String },
  role: { type: String, default: "user" }

 
}, 
{ timestamps: true } 
);

module.exports = mongoose.model("User", userSchema);
