const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Orders {
    constructor(product_name, price,amount,id) {
        this.product_name = product_name;
        this.price = price;
        this.amount = amount;
        this._id = id;
    }

    // save() {
    //     const db = getDb();
    //     let dbOp;
    //     if (this._id) {
    //         // Update the product
    //         dbOp = db
    //             .collection('orders')
    //             .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    //     } else {
    //         // Insert product
    //         dbOp = db.collection('orders').insertOne(this);
    //     }
    //     return dbOp
    //         .then(result => {
    //             console.log(result);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }
    static fetchAll() {
        const db = getDb();
        return db
            .collection('orders')
            .find()
            .toArray()
            .then(orders => {
                console.log(orders);
                return orders;
            })
            .catch(err => {
                console.log(err);
            });
    }
}


module.exports = Orders;