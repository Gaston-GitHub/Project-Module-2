const express = require('express');

const router = express.Router();

const Store = require('../models/store')


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});


router.get('/ropaycalzado', (req, res, next) => {
  Store.find({category: "Ropa y Calzado"})
  .then((stores) => {
    res.render('categoria/ropaycalzado', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/alimentacion', (req, res, next) => {
  Store.find({category: "Alimentación"})
  .then((stores) => {
    res.render('categoria/alimentacion', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/farmacias', (req, res, next) => {
  Store.find({category: "Farmacias"})
  .then((stores) => {
    res.render('categoria/farmacias', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/electronica-e-informatica', (req, res, next) => {
  Store.find({category: "Farmacias"})
  .then((stores) => {
    res.render('categoria/electronica-informatica', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/papeleria-y-documentacion', (req, res, next) => {
  Store.find({category: "Papelería y Documentación"})
  .then((stores) => {
    res.render('categoria/papeleria-y-documentacion', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/floristeria', (req, res, next) => {
  Store.find({category: "Floristería"})
  .then((stores) => {
    res.render('categoria/floristeria', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/bricolaje', (req, res, next) => {
  Store.find({category: "Bricolaje"})
  .then((stores) => {
    res.render('categoria/bricolaje', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/decoracion-y-muebles', (req, res, next) => {
  Store.find({category: "Decoración y Muebles"})
  .then((stores) => {
    res.render('categoria/decoracion-y-muebles', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/restauracion-y-hosteleria', (req, res, next) => {
  Store.find({category: "Restauración y Hostelería"})
  .then((stores) => {
    res.render('categoria/restauracion-y-hosteleria', {stores});
  })
  .catch(error => {
    next(error);
  });
});


module.exports = router;
