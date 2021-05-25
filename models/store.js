const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({

    name: String,
    address: String,
    category:  {type: String, enum: ["Ropa y Calzado", "Alimentación", "Farmacias", "Electrónica e Informática",
     "Papelería y Documentación", "Floristería", "Bricolaje"
     , "Decoración y Muebles", "Restauración y Hostelería", "Otros"]},
     imgStore: {type: String, required: true},
});

const Store = mongoose.model('Store', userSchema);

module.exports = Store;