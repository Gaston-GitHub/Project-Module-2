const express = require('express');
const checkIfUserIsLoggedIn = require('../middlewares/auth');

const checkIfUserisLoggedIn = require('../middlewares/auth')

const router = express.Router();

const Product = require('../models/product')

router.use(checkIfUserIsLoggedIn);




//   show all products created 

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

// show create products

router.get('/create', (req, res) => {
    res.render('products/create');
})

router.get('/:id', (req, res, next) => {
    const {id} = req.params
    Product.findById(id)
    .then((product) => {
        // eslint-disable-next-line no-console
        console.log('product', product)
        res.render('products/info', {product})
    })
    .catch(error => {next(error)})  
})

// create product

router.post('/', (req, res, next) => {
    const product = req.body;
    Product.create({
        store: product.store,
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price,   
  })
  .then(prod => {
      // eslint-disable-next-line no-console
      console.log(prod);
      res.redirect('/products');
  })
  .catch((error) => {
      next(error);
  });
});

// delete product

router.get('/:id/delete', (req, res, next) => {
    const {id} = req.params;
    Product.findByIdAndDelete(id)
    .then((prod) => {
        // eslint-disable-next-line no-console
        console.log('delete', prod )
    })
    .catch((error) => {
        next(error);
    });
});

// info product

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

// update product

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