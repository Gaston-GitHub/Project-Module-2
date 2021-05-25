const express = require('express');

const checkIfUserIsLoggedIn = require('../middlewares/auth');

const router = express.Router();

const Store = require('../models/store')

const Product = require('../models/product')

router.use(checkIfUserIsLoggedIn);

// localhost:3000/product-create
router.get('/product-create', (req, res) => {
    Store.find()
    .then((dbStore) => {
        res.render('products/create', { dbStore: dbStore});
    })
    .catch((err) => 
    console.log(`Err while displaying product input page: ${err}`)
    );
});


router.post('/product-create', (req, res, next) => {
    const { name, description, quantity, price, store } = req.body;
    Product.create({ name, description, quantity, price, store })
    .then((dbProduct) => {
        return Store.findByIdAndUpdate(store, { $push: { products: dbProduct._id }});
    })
    .then(() => {
        res.redirect('/products');
    })
    .catch((error) => {
        next(error);
    });
});


// Show all products created 

router.get('/products', (req, res, next) => {
    Product.find()
    .populate('store', {name: 1})
    .then((dbProduct) => {
        res.render('products/index', { products: dbProduct })
    })
    .catch(error => {
        next(error);
    });
})

module.exports = router;


// Show create products

// router.get('/create', (req, res) => {
//     res.render('products/create');
// })

// router.get('/:id', (req, res, next) => {
//     const {id} = req.params
//     Product.findById(id)
//     .then((product) => {
//         // eslint-disable-next-line no-console
//         console.log('product', product)
//         res.render('product/info', {product})
//     })
//     .catch(error => {next(error)})  
// })

// // create product

// router.post('/', checkIfUserIsLoggedIn, (req, res, next) => {
//     const product = req.body;
//     Product.create({ 
//         name: product.name, 
//         description: product.description, 
//         quantity: product.quantity, 
//         price: product.price,
//         store: store._, 

//     })
//     .then((dbProduct) => {
//         return Store.findByIdAndUpdate(store, { $push:
//         // eslint-disable-next-line no-underscore-dangle
//         { products: dbProduct._id } });
//         })
//     .then(() => {
//       res.redirect('products/info');
//     })
//     .catch((error) => {
//     next(error);
//     });
// });



// router.get('/products', (req, res, next) => {
//     Product.find()
//         .populate('store', {store: 1})
//         .then((dbProducts) => {
//             res.render('products/index', {products: dbProducts})
//         })
//         .catch((error) => {
//             next(error);
//         });    
// })

// // Delete product

// router.post('/:id/delete', (req, res, next) => {
//     const {id} = req.params;
//     Product.findByIdAndDelete(id)
//     .then((prod) => {
//         // eslint-disable-next-line no-console
//         console.log('delete', prod )
//         res.redirect('/products')
//     })
//     .catch((error) => {
//         next(error);
//     });
// });

// // Info product

// router.get('/:id/edit', (req, res, next) => {
//     const {id} = req.params;
//     Product.findById(id)
//     .then(product => {
//         res.render('products/edit', {product})
//     })
//     .catch(error => {
//         next(error);
//     });
// });

// // Update product

// router.post('/id', (req, res, next) => {
    
//     const {name, description, quantity, price} = req.body;
//     Product.findByIdAndUpdate({name, description, quantity, price}, {new:true})
//     .then(() => {
//         // eslint-disable-next-line no-console
//         console.log('update')
//         res.redirect('/products')
//     })
//     .catch((error) => {
//         next(error);
//     })
// })



// Create Product

// // id de la tienda y form crear producto
// router.get('/:id/products-create', (req, res) => {
//     const {id} = req.params
//     Store.findById(id)
//       .then((dbStore) => {
//         res.render('products/create', { dbStore });
//       })
//       .catch((err) =>
//         // eslint-disable-next-line no-console
//         console.log(`Err while displaying post input page: ${err}`)
//       );
//   }); 



//   router.post('/product-create', (req, res, next) => {
//     const product = req.body
//     Product.create({ 
//         name: product.name, 
//         description: product.description,
//         quantity: product.quantity, 
//         price: product.price, 
//         store: product.store,
//     })
//     .then(dbProduct => {
//         console.log(product);
//       return Store.findByIdAndUpdate(store, { $push: { products: dbProduct} });
//     })
//     .then(() => {
//         res.redirect('/stores');
//       })
//     .catch((error) => {
//     next(error);
//     });
// });


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