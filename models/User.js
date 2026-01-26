const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: 'user' },
    resetPasswordToken : String,
    resetPasswordExpiry: Date
});

module.exports = mongoose.model('User', UserSchema);