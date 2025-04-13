const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, default: "student" }, // "admin" or "student"
  grades: {
    classAttendance: { type: Boolean, default: false },
    quiz: { type: Boolean, default: false },
    assignment: { type: Boolean, default: false },
    participation: { type: Boolean, default: false },
    extracurricular: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model('User', userSchema);
