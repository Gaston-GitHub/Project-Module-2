const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    hashedPassword: {
        type: String,
        require: [true, 'password is required'],
    },
    adress: String,
    companyName: String,
    cif: Number,
    category: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;