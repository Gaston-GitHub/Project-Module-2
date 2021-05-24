const express = require('express');

const checkIfUserIsLoggedIn = require('../middlewares/auth')

const router = express.Router();

const Store = require('../models/store')

router.use(checkIfUserIsLoggedIn);

// show all the stores created
router.get('/', (req, res, next) => {
    Store.find({})
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

// CREAT PRODUCT

router.get('/:id/product-create', (req, res) => {
    const {id} = req.params
    Store.findById(id)
      .then((dbStore) => {
        res.render('products/create', { dbStore });
      })
      .catch((err) =>
        console.log(`Err while displaying post input page: ${err}`)
      );
  });




// create store

router.post('/', checkIfUserIsLoggedIn, (req, res, next) => {
    const store = req.body;
    Store.create({
        owner: req.session.currentUser,
        name: store.name,
        address: store.address,
        category: store.category
    })
    .then(store => {
        // eslint-disable-next-line no-console
        console.log(store);
        res.redirect('/stores');
    })
        .catch((error) => {
            next(error);
        });
    });

    
// delete store

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



// info store

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


// update store
router.post('/:id', (req, res, next) => {
    const {id} = req.params;
    const {name, address, category} = req.body
    Store.findByIdAndUpdate(id, {name, address, category}, {new:true})
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('update')
        res.redirect('/stores')
    })
    .catch((error) => {
        next(error);
    })
})




// create product

router.post('/product-create', (req, res, next) => {
    const { name, description, quantity, price, store } = req.body;
    Product.create({ name, description, quantity, price, store})
    .then((dbProduct) => { 
        return Store.findByIdAndUpdate(store, { $push: 
        { product: dbProduct._id } });
    })
    .then(() => {
      res.redirect('stores/info');
    })
    .catch((error) => {
    next(error);
    });
});

module.exports = router;