const mongoose = require('mongoose');
const User = require('../models/user');

require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB 🚀');
  })
  .then(() =>
    User.create({
      name: 'Genaro',
      email: 'genaroprueba@gmail.com',
      hashedPassword: '123567',
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
