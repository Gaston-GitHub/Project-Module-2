const express = require('express');

const router = express.Router();

const Store = require('../models/store')


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});


module.exports = router;
