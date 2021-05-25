const mongoose = require('mongoose');

const { Schema } = mongoose;

const storeSchema = new Schema({

    owner: {type: Schema.Types.ObjectId, ref:'User'},
    name: String,
    address: String,
    category:  {type: String, enum: ["Ropa y Calzado", "Alimentación", "Farmacias", "Electrónica e Informática",
     "Papelería y Documentación", "Floristería", "Bricolaje"
     , "Decoración y Muebles", "Restauración y Hostelería", "Otros"]},
    imgStore: {type: String, required: true},
    products: [{type: Schema.Types.ObjectId, ref:'Product'}]
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;