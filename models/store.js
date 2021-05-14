const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({

    name: String,
    address: String,
    category: String,
});

const Store = mongoose.model('Store', userSchema);

module.exports = Store;