const mongoose = require('mongoose');

const{ Schema } = mongoose;

const productSchema = new Schema({

    store: {type: Schema.Types.ObjectId, ref:'Store'},
    name: String,
    description: String,
    quantity: Number, 
    price: Number,

});

const Product = mongoose.model('Product', productSchema)

module.exports = Product;
