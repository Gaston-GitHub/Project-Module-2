const mongoose = require('mongoose');
const User = require('../models/user');

mongoose
  .connect('mongodb://localhost:27017/digital-commerces', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB 🚀');
  })
  .then(() =>
    User.create({
      name: 'Genaro',
      lastName: 'Miranda',
      email: 'genaroprueba@gmail.com',
      hashedPassword: '123567',
      adress: 'Calle minas 16',
      companyName: 'Taberna Creativa',
      cif: 123456,
      category: 'Digital'
    }),
  )
  .then(() => {
    console.log('genaro user created');
  })
  .catch(error => {
    console.log('error ', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
