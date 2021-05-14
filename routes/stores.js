const express = require('express');

const router = express.Router();

const Store = require('../models/store')

router.get('/stores', (req, res, next) => {
    Store.find({})
    .then((stores) => {
        res.render('stores/index', {stores})
    })
} )

router.get('/stores/create', (req, res, next) => {
    res.render('stores/create')
})

router.get('/stores/:id', (req, res, next) => {
    const {id} = req.params
    Store.findById(id)
    .then((store) => {
        console.log('store', store)
        res.render('stores/details', {store})
    })
    .catch(error => {next(error)})
})

router.get('stores/:id/edit', (req, res, next) => {
    const {id} = req.params;
    Store.findById(id)
    .then((storeId) => res.render('stores/edit', storeId))
    .catch((error) => next(error))
})

router.post('/stores', (req, res, next) => {
    const {name, address, email} = req.body
    Store.create({name, address, email})
    .then(() => res.redirect('/stores'))
    .catch((error) => {
        res.render('/stores/create', error)
    })
})

router.post('/stores/:id/delete', (req, res, next) => {
    const {id} = req.params
    Store.findByIdAndRemove(id)
    .then(() => {
        res.redirect('/stores')
    })
    .catch((error) => {
        next(error)
    })
})

router.post('/stores/:id', (req, res, next) => {
    const {name, address, }
})

module.exports = router;