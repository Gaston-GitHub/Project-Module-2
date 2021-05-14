const express = require('express');

const checkIfUserIsLoggedIn = require('../middlewares/auth')

const router = express.Router();

const Store = require('../models/store')

router.use(checkIfUserIsLoggedIn);

// eslint-disable-next-line no-unused-vars
router.get('/stores', (req, res, next) => {
    Store.find({})
    .then((stores) => {
        res.render('stores/index', {stores})
    })
})

// eslint-disable-next-line no-unused-vars
router.get('/create', (req, res, next) => {
    res.render('stores/create')
})

router.get('/stores/:id', (req, res, next) => {
    const {id} = req.params
    Store.findById(id)
    .then((store) => {
        // eslint-disable-next-line no-console
        console.log('store', store)
        res.render('stores/info', {store})
    })
    .catch(error => {next(error)})
})

router.get('/stores/:id/edit', (req, res, next) => {
    const {id} = req.params;
    Store.findById(id)
    .then((store) => res.render('stores/edit', {store}))
    .catch((error) => next(error))
})

// eslint-disable-next-line no-unused-vars
router.post('/:id/edit', (req, res, next) => {
    const {name, address, category} = req.body;
    Store.create({name, address, category})
    .then((newStore) => {
    console.log(newStore) 
    res.redirect('/stores')
    })
    .catch((error) => {
        console.log(error)
    })
})

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

// eslint-disable-next-line no-unused-vars
router.post('stores/:id', (req, res, next) => {
    const {name, address, category} = req.body
    Store.findByIdAndUpdate(req.params.id, {name, address, category}, {new:true})
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('update')
        res.redirect('/stores')
    })
    .catch((error) => console.log(error))
})

module.exports = router;