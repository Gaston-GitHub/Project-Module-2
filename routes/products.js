const express = require('express');

const checkIfUserIsLoggedIn = require('../middlewares/auth');

const router = express.Router();

const Store = require('../models/store')

const Product = require('../models/product')


router.use(checkIfUserIsLoggedIn);




//   show all products created 

router.get('/', (req, res, next) => {
    Product.find({})
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

// find store for create product

router.get('/product-create', (req, res) => {
    Store.find()
      .then((dbStore) => {
        res.render('products/create', { dbStore });
      })
      .catch((err) =>
        console.log(`Err while displaying post input page: ${err}`)
      );
  });

// create product

// router.post('/product-create', (req, res, next) => {
//     const { name, description, quantity, price, store } = req.body;
//     Product.create({ name, description, quantity, price, store})
//     .then((dbProduct) => { 
//         return Store.findByIdAndUpdate(store, { $push: 
//         { product: dbProduct._id } });
//     })
//     .then(() => {
//       res.redirect('/products');
//     })
//     .catch((error) => {
//     next(error);
//     });
// });

// router.post('/', (req, res, next) => {
//     const product = req.body;
//     Store.find({ owner: req.session.currentUser})
//     .then(store => {
//         console.log('storeID:', store._id)
//         const idStore = store._id;
//     })
//     Product.create({
//         idStore,
//         name: product.name,
//         description: product.description,
//         quantity: product.quantity,
//         price: product.price,   
//   })
//   .then(prod => {
//       // eslint-disable-next-line no-console
//       console.log(prod);
//       res.redirect('/products');
//   })
//   .catch((error) => {
//       next(error);
//   });
// });

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
    .populate('store')
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