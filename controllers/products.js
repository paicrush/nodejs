const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Product = require('../models/products');
const ObjectId = mongodb.ObjectId;

exports.selectAllProduct = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('home/home', {
                pageTitle: 'Search Product',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}
exports.getSearchProduct = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('products/search', {
                pageTitle: 'Search Product',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getAddProduct = (req, res, next) => {
    const product_name = '';
    const price = '';
    const amount = '';
    const detail = '';
    const category = '';
    const img = '';
    res.render('products/insert', {
        pageTitle: 'Insert Product',
        errorMessage: null,
        product_name: product_name,
        price: price,
        amount :amount,
        detail :detail,
        category: category,
        img :img
    });
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const { product_name, price, amount,detail,category,img} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('products/insert', {
            pageTitle: 'Insert Product',
            errorMessage: errors.array(),
            product_name: product_name,
            price: price,
            amount :amount,
            detail :detail,
            category: category,
            img :img
        });
    }

    const product = new Product(product_name, price,amount,detail,category,img);
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/product');
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getUpdateProduct = (req, res, next) => {
    console.log(req.params);
    const { product_id } = req.params;
    let product_name = '';
    let price = '';

    Product.findById(product_id)
        .then(product => {
            console.log(product);
            product_name = product.product_name;
            price = product.price;
            res.render('products/update', {
                pageTitle: 'Update Product',
                errorMessage: null,
                product_id: product_id,
                product_name: product_name,
                price: price
            });
        })
        .catch(err => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
    console.log(req.body);
    const { product_id, product_name, price } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('products/update', {
            pageTitle: 'Update Product',
            errorMessage: errors.array(),
            product_id: product_id,
            product_name: product_name,
            price: price
        });
    }

    const product = new Product(product_name, price, new ObjectId(product_id));
    product
        .save()
        .then(result => {
            console.log('Update Product');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
};

exports.getDeleteProduct = (req, res, next) => {
    const { product_id } = req.params;
    console.log(product_id);
    Product.deleteById(product_id)
        .then(() => {
            console.log('Delete Product');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
};

// exports.detailProduct = (req, res, next) => {
//     const { product_id } = req.params;
//     console.log(product_id);
//     Product.findById(product_id)
//         .then((product) => {
//             res.render('home/detail', {
//                 prods: product,
//             });
//         })
//         .catch(err => console.log(err));
// };

exports.detailProduct = (req, res, next) => {
    console.log(req.params);
    const { product_id } = req.params;
    let product_name = '';
    let price = '';
    let detail = '';
    let img = '';

    Product.findById(product_id)
        .then(product => {
            console.log(product);
            product_name = product.product_name;
            price = product.price;
            detail = product.detail;
            img = product.img;
            res.render('home/detail', {
                errorMessage: null,
                product_id: product_id,
                product_name: product_name,
                price: price,
                detail : detail,
                img : img
            });
        })
        .catch(err => console.log(err));
};

exports.selectCategory = (req, res, next) => {
    const { orderby } = req.body;
    
    Product.fetchCategory(orderby)
        .then(products => {
            res.render('home/home', {
                
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
};

