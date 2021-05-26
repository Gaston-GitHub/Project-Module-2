const express = require('express');

const router = express.Router();

const Product = require('../models/product')

const Store = require('../models/store')


/* GET ROPA Y CALZADO page ========================*/

router.get('/ropa-y-calzado', (req, res, next) => {
  Store.find()
  .populate('products')
  .then((dbStore) => {
    res.render('categoria/ropa-y-calzado', {store: dbStore});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/ropa-y-calzado/:id', (req, res, next) => {
  const {id} = req.params;
  Store.findById(id)
  .populate('products')
  .then((store) => {
      // eslint-disable-next-line no-console
      console.log('store', store)
      res.render('info-store', { store })
  })
  .catch(error => {next(error)});

})


// // Show all products created and populate

// router.get('/products', (req, res, next) => {
//   Product.find()
//   .populate('store', {name: 1})
//   .then((dbProduct) => {
//       res.render('products/index', { products: dbProduct })
//   })
//   .catch(error => {
//       next(error);
//   });
// })



/* GET ALIMENTACION page ========================*/


router.get('/alimentacion', (req, res, next) => {
  Store.find({category: "Alimentación"})
  .then((stores) => {
    res.render('categoria/alimentacion', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/alimentacion/:id', (req, res, next) => {
  const {id} = req.params
  Store.findById(id)
  .then((store) => {
      // eslint-disable-next-line no-console
      console.log('store', store)
      res.render('info-store', {store})
  })
  .catch(error => {next(error)})
})

/* GET FARMACIAS page ========================*/


router.get('/farmacias', (req, res, next) => {
  Store.find({category: "Farmacias"})
  .then((stores) => {
    res.render('categoria/farmacias', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/farmacias/:id', (req, res, next) => {
  const {id} = req.params
  Store.findById(id)
  .then((store) => {
      // eslint-disable-next-line no-console
      console.log('store', store)
      res.render('info-store', {store})
  })
  .catch(error => {next(error)})
})


/* GET ELECTRÓNICA E INFORMÁTICA page ========================*/


router.get('/electronica-e-informatica', (req, res, next) => {
  Store.find({category: "Farmacias"})
  .then((stores) => {
    res.render('categoria/electronica-informatica', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/electronica-e-informatica/:id', (req, res, next) => {
  const {id} = req.params
  Store.findById(id)
  .then((store) => {
      // eslint-disable-next-line no-console
      console.log('store', store)
      res.render('info-store', {store})
  })
  .catch(error => {next(error)})
})

/* GET PAPELERÍA Y DOCUMENTACIÓN page ========================*/


router.get('/papeleria-y-documentacion', (req, res, next) => {
  Store.find({category: "Papelería y Documentación"})
  .then((stores) => {
    res.render('categoria/papeleria-y-documentacion', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/papeleria-y-documentacion/:id', (req, res, next) => {
  const {id} = req.params
  Store.findById(id)
  .then((store) => {
      // eslint-disable-next-line no-console
      console.log('store', store)
      res.render('info-store', {store})
  })
  .catch(error => {next(error)})
})

/* GET FLORISTERIA page ========================*/


router.get('/floristeria', (req, res, next) => {
  Store.find({category: "Floristería"})
  .then((stores) => {
    res.render('categoria/floristeria', {stores});
  })
  .catch(error => {
    next(error);
  });
});


router.get('/floristeria/:id', (req, res, next) => {
  const {id} = req.params
  Store.findById(id)
  .then((store) => {
      // eslint-disable-next-line no-console
      console.log('store', store)
      res.render('info-store', {store})
  })
  .catch(error => {next(error)})
})


/* GET BRICOLAJE page ========================*/


router.get('/bricolaje', (req, res, next) => {
  Store.find({category: "Bricolaje"})
  .then((stores) => {
    res.render('categoria/bricolaje', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/bricolaje/:id', (req, res, next) => {
  const {id} = req.params
  Store.findById(id)
  .then((store) => {
      // eslint-disable-next-line no-console
      console.log('store', store)
      res.render('info-store', {store})
  })
  .catch(error => {next(error)})
})

/* GET DECORACIÓN Y MUEBLES  ========================*/


router.get('/decoracion-y-muebles', (req, res, next) => {
  Store.find({category: "Decoración y Muebles"})
  .then((stores) => {
    res.render('categoria/decoracion-y-muebles', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/decoracion-y-muebles/:id', (req, res, next) => {
  const {id} = req.params
  Store.findById(id)
  .then((store) => {
      // eslint-disable-next-line no-console
      console.log('store', store)
      res.render('info-store', {store})
  })
  .catch(error => {next(error)})
})

/* GET RESTAURACIÓN Y HOSTELERÍA  ========================*/


router.get('/restauracion-y-hosteleria', (req, res, next) => {
  Store.find({category: "Restauración y Hostelería"})
  .then((stores) => {
    res.render('categoria/restauracion-y-hosteleria', {stores});
  })
  .catch(error => {
    next(error);
  });
});

router.get('/restauracion-y-hosteleria/:id', (req, res, next) => {
  const {id} = req.params
  Store.findById(id)
  .then((store) => {
      // eslint-disable-next-line no-console
      console.log('store', store)
      res.render('info-store', {store})
  })
  .catch(error => {next(error)})
})

module.exports = router;
