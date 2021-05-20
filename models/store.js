const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({

    _id: Schema.Types.ObjectId,
    name: String,
    address: String,
    category:  {type: String, enum: ["Ropa y Calzado", "Alimentación", "Farmacias", "Electrónica e Informática",
     "Papelería y Documentación", "Floristería", "Bricolaje"
     , "Decoración y Muebles", "Restauración y Hostelería", "Otros"]},
});

const Store = mongoose.model('Store', userSchema);

module.exports = Store;