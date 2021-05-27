const express = require('express');
const multer = require('multer');
const checkIfUserIsLoggedIn = require('../middlewares/auth');
const router = express.Router();
const Store = require('../models/store')
const Product = require('../models/product')

router.use(checkIfUserIsLoggedIn);


const fileStorageEngineP = multer.diskStorage({
    // destination for files
  destination: (req, file, cb) => {
  cb(null, './public/uploads/products');
  },

  // back files
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// upload parameters for multer
const upload = multer({
     storage: fileStorageEngineP 
  });





// localhost:3000/product-create show form
router.get('/product-create', (req, res) => {
    Store.find()
    .then((dbStore) => {
        res.render('products/create', { dbStore});
    })
    .catch((err) => 
    console.log(`Err while displaying product input page: ${err}`)
    );
});


// localhost:3000/product-create post of form and update the products in the Store model
router.post('/product-create', upload.single('imgProduct'), checkIfUserIsLoggedIn, (req, res, next) => {
    const { name, description, quantity, price, store } = req.body;
    Product.create({ 
        name, 
        description, 
        quantity, 
        price, 
        store,
        imgProduct: req.file.originalname, 
    })
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

// Show all products created and populate

router.get('/products', checkIfUserIsLoggedIn, (req, res, next) => {
    Product.find({ })
    .populate('store', {name: 1})
    .then((dbProduct) => {
        res.render('products/index', { products: dbProduct })
    })
    .catch(error => {
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


// // Update product

router.post('/:id', (req, res, next) => {
    const {id} = req.params;
    const {name, description, quantity, price} = req.body;
    Product.findByIdAndUpdate(id, {name, description, quantity, price}, {new:true})
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




