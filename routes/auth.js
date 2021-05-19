const express = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const checkIfUserIsLoggedIn = require('../middlewares/auth');

const router = express.Router();

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.get('/profile', checkIfUserIsLoggedIn, (req, res, next) => {
  console.log('user', req.session.currentUser);
  res.render('auth/profile', { user: req.session.currentUser });
});

router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params.id
    User.findById(id)
    .then((userId) => res.render('auth/profile', userId))
    .catch((error) => next(error))
})

router.post('/signup', (req, res, next) => {
  const { name, email, password } = req.body;

  bcryptjs
    .genSalt(10)
    .then(salt => {
      console.log('salt', salt);
      return bcryptjs.hash(password, salt);
    })
    .then(hashedPassword => User.create({ name, email, hashedPassword }))
    .then(() => {
      console.log('hashedPassword')
      res.redirect('/profile');
    })
    .catch(error => next(error));
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(dbUser => {
      if (!dbUser) {
        return res.render('auth/login', { error: 'user not found' });
      }
      const { _id, email: eMail, hashedPassword } = dbUser;
      if (bcryptjs.compareSync(password, hashedPassword)) {
        req.session.currentUser = {
          _id,
          email: eMail,
        };
        return res.redirect('/profile');
      }
      return res.render('auth/login', { error: 'password incorrect' });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(error => {
    // do something
    if (error) {
        return next(error);
    }
    return res.redirect('/login');
  });
});

module.exports = router;
