const express = require('express');

const checkIfUserIsLoggedIn = require('../middlewares/auth');

const router = express.Router();

const Store = require('../models/store')

const Product = require('../models/product')

router.use(checkIfUserIsLoggedIn);

// Show all products created 

router.get('/', (req, res, next) => {
    Product.find({})
    .populate('store')
    .then((products) => {
        res.render('products/index', {products})
    })
    .catch(error => {
        next(error);
    });
});

// Show create products

router.get('/create', (req, res) => {
    res.render('products/create');
})

router.get('/:id', (req, res, next) => {
    const {id} = req.params
    Product.findById(id)
    .then((product) => {
        // eslint-disable-next-line no-console
        console.log('product', product)
        res.render('product/info', {product})
    })
    .catch(error => {next(error)})  
})

// Find store for create product

router.get('/product-create', (req, res) => {
    Store.find()
      .then((dbStore) => {
        res.render('product/create', { dbStore });
      })
      .catch((err) =>
        // eslint-disable-next-line no-console
        console.log(`Err while displaying post input page: ${err}`)
      );
  });

// router.post('/product-create', (req, res, next) => {
//     const { store, name, description, quantity, price } = req.body;
//     Product.create({ store, name, description, quantity, price})
//     // eslint-disable-next-line arrow-body-style
//     .then(dbProduct => {
//         console.log(dbProduct);
//       res.redirect('products/info');
//     })
//     .catch((error) => {
//     next(error);
//     });
// });

router.get('/products', (req, res, next) => {
    Product.find()
        .populate('store', {store: 1})
        .then((dbProducts) => {
            res.render('products/index', {products: dbProducts})
        })
        .catch((error) => {
            next(error);
        });    
})

// Delete product

router.post('/:id/delete', (req, res, next) => {
    const {id} = req.params;
    Product.findByIdAndDelete(id)
    .then((prod) => {
        // eslint-disable-next-line no-console
        console.log('delete', prod )
        res.redirect('/products')
    })
    .catch((error) => {
        next(error);
    });
});

// Info product

router.get('/:id/edit', (req, res, next) => {
    const {id} = req.params;
    Product.findById(id)
    .then(product => {
        res.render('products/edit', {product})
    })
    .catch(error => {
        next(error);
    });
});

// Update product

router.post('/id', (req, res, next) => {
    
    const {name, description, quantity, price} = req.body;
    Product.findByIdAndUpdate({name, description, quantity, price}, {new:true})
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('update')
        res.redirect('/products')
    })
    .catch((error) => {
        next(error);
    })
})

module.exports = router;