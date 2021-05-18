const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    hashedPassword: {
        type: String,
        require: [true, 'password is required'],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;