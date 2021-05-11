const express = require('express');
const bcryptjs = require('bcryptjs');

const User = require('...model/user');
const router = express.Router();




router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
})

router.post('/signup', (req, res, next) => {
    const { name, lastName, email, password, 
        address, companyName, cif, category } = req.body;

        bcryptjs
        .genSalt(10)
        .then(salt => {
            console.log('salt', salt);
            return bcryptjs.hash(password, salt);
        })
        .then(hashedPassword => User.create({ name, lastName, email, hashedPassword, 
            address, companyName, cif, category}))
        .then(() => {
            res.redirect('/')
        })
        .catch(error => next(error))
})


module.exports = router;

