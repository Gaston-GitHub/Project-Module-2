const express = require('express');
const multer = require('multer');
const checkIfUserIsLoggedIn = require('../middlewares/auth')

const router = express.Router();
const Store = require('../models/store')

const Product = require('../models/product')

router.use(checkIfUserIsLoggedIn);

  
  const fileStorageEngine = multer.diskStorage({
      // destination for files
    destination: (req, file, cb) => {
    cb(null, './public/uploads');
    },

    // back files
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  // upload parameters for multer
  const upload = multer({
       storage: fileStorageEngine 
    });
  


// show all the stores created
router.get('/', checkIfUserIsLoggedIn, (req, res, next) => {
    Store.find({ })
    .then((stores) => {
        res.render('stores/index', {stores});
    })
    .catch(error => {
        next(error);
    });
});

// show create page

router.get('/create', (req, res) => {
    res.render('stores/create');
})

router.get('/:id', (req, res, next) => {
    const {id} = req.params
    Store.findById(id)
    .then((store) => {
        // eslint-disable-next-line no-console
        console.log('store', store)
        res.render('stores/info', {store})
    })
    .catch(error => {next(error)})
})




// create store

router.post('/', upload.single('imgStore'), checkIfUserIsLoggedIn, (req, res, next) => {
    const store = req.body;
    Store.create({
        owner: req.session.currentUser,
        name: store.name,
        address: store.address,
        category: store.category,
        imgStore: req.file.originalname,
    })
    // eslint-disable-next-line no-shadow
    .then(store => {
        // eslint-disable-next-line no-console
        console.log(store);
        res.redirect('/stores');
    })
        .catch((error) => {
            next(error);
        });
    });

    


    
// Delete store

router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params
    Store.findByIdAndDelete(id)
    .then((store) => {
        // eslint-disable-next-line no-console
        console.log('delete', store)
        res.redirect('/stores')        
    })
    .catch((error) => {
        next(error)
    })
})

// Info store

router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params;
    Store.findById(id)
    .then(store => {
        res.render('stores/edit', { store });
    })
    .catch(error => {
        next(error);
    });
})


// Update store

router.post('/:id', upload.single('imgStore'), (req, res, next) => {
    const {id} = req.params;
    const {address, category} = req.body;
    const imgStore = req.file.originalname;
    Store.findByIdAndUpdate(id, {address, category, imgStore}, {new:true})
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('update')
        res.redirect('/stores')
    })
    .catch((error) => {
        next(error);
    })
})




/* create product

router.post('/product-create', (req, res, next) => {
    const { name, description, quantity, price, store } = req.body;
    Product.create({ name, description, quantity, price, store})
    .then((dbProduct) => Store.findByIdAndUpdate(store, { $push: 
        { product: dbProduct._id } }))
    .then(() => {
      res.redirect('stores/info');
    })
    .catch((error) => {
    next(error);
    });
}); */

module.exports = router;