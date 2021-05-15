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

//create store

router.post('/', (req, res, next) => {
    const store = req.body;
    Store.create({
        name: store.name,
        address: store.address,
        category: store.category
    })
    .then(store => {
        console.log(store);
        res.redirect('/stores');
    })
        .catch((error) => {
            next(error);
        });
    });

    
//delete store

router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params
    Store.findByIdAndDelete(id)
    .then((store) => {
        console.log('delete', store)
        res.redirect('/stores')        
    })
    .catch((error) => {
        next(error)
    })
})



//info store

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



module.exports = router;

