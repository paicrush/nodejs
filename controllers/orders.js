const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Orders = require('../models/orders');

// const ObjectId = mongodb.ObjectId;

exports.saveOrder = (req, res, next) => {
    console.log(req.body);
    const { product_name, price, amount} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('products/insert', {
            pageTitle: 'Insert Product',
            errorMessage: errors.array(),
            product_name: product_name,
            amount :amount,
            price: price,
        });
    }

    const orders = new Orders(product_name,amount, price);
    orders
        .save()
        .then(result => {
            console.log(result);
            console.log('Created Product');
            res.redirect('/products');
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getOrders = (req, res, next) => {
    Orders.fetchAll()
        .then(orders => {
            res.render('card/card', {
                pageTitle: 'orders',
                prods: orders,
            });
        })
        .catch(err => {
            
        });
}


