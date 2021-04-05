const express = require('express');

const { check } = require('express-validator')
const router = express.Router();

const productsController = require('../controllers/products');
const ordersController = require('../controllers/orders');
// /admin/add-product => GET
router.get('/product', productsController.getSearchProduct);

router.get('/product/insert', productsController.getAddProduct);

router.get('/:product_id', productsController.detailProduct);

router.get('/product/update/:product_id', productsController.getUpdateProduct);

router.get('/', productsController.selectAllProduct);

router.post('/category', productsController.selectCategory);


// /admin/add-product => POST
router.post('/insert', [
    check('product_name').trim().not().isEmpty().withMessage("product name is required"),
    check('price').isFloat({ gt: 0 }).withMessage("greater than zero"),
    check('amount').isFloat({ gt: 0 }).withMessage("greater than zero"),
    check('detail').trim().not().isEmpty().withMessage("product name is required"),
    check('category').trim().not().isEmpty().withMessage("product name is required"),
    check('img').trim().not().isEmpty().withMessage("product name is required"),
], productsController.postAddProduct);

router.post('/card2', ordersController.saveOrder);

router.get('/card', ordersController.getOrders);

router.post('/update', [
    check('product_id').not().isEmpty().withMessage("empty"),
    check('product_name').trim().isLength({ min: 1 }).withMessage("product name is required"),
    check('price').isFloat({ gt: 0 }).withMessage("greater than zero")
], productsController.postUpdateProduct);

router.get('/delete/:product_id', productsController.getDeleteProduct);

exports.routes = router;