const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User',
    }
})

module.exports= mongoose.model('Product', productSchema)


// const products = [];
// const fs = require('fs');
// const path = require('path');
// const p = path.join(
//     path.dirname(require.main.filename),
//     'data',
//     'products.json'
// );
// const Cart = require('./cart');

// const getProductsFromFile = cb => {
//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             cb([]);
//         } else {
//             cb(JSON.parse(fileContent));
//         }
//     });
// };

// module.exports = class Product {
//     constructor(id, title, imageUrl, price, description) {
//         this.id = id;
//         this.title = title;

//         this.imageUrl = imageUrl;
//         this.price = price;
//         this.description = description;
//     }

//     save() {
//         getProductsFromFile(products => {
//             if (this.id) {
//                 const existingProductIndex = products.findIndex(prod => prod.id === this.id);
//                 const updatedProducts = [...products];
//                 updatedProducts[existingProductIndex] = this;
//                 fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//                     console.log(err);
//                 });
//             } else {
//                 this.id = Math.random().toString();
//                 products.push(this);
//                 fs.writeFile(p, JSON.stringify(products), err => {
//                     console.log(err);
//                 });
//             }
//         });
//     }

//     static deleteById(id, cb) {
//         getProductsFromFile(products => {
//             const _product= products.find(prod => prod.id ===id);
//             const _products = products.filter(p => p.id !== id);
//             fs.writeFile(p, JSON.stringify(_products), err => {
//                 Cart.deleteProduct(id,_product.price)
//             });
//         });
//     }
//     static fetchAll(callback) {
//         getProductsFromFile(callback);
//     };

//     static findById(id, cb) {
//         getProductsFromFile(products => {
//             const _product = products.find(p => p.id === id);
//             cb(_product);
//             /*  const updatedProducets = products.filter(prod => prod.id !== id);
//              fs.writeFile(p, JSON.stringify(updatedProducets), err => {
//                  console.log(err);
//              }); */

//             /*    fs.writeFile(p, JSON.stringify(updatedProducets), err => {
//                    if (!err) {
//                        cart.deleteProduct(id, _product.price);
//                    }
//                }); */
//         });
//     }
// };


// Mongo DB

// const mongoConnect = require('../utils/database').mongoConnect;
// const getDb = require('../utils/database').getDb;
// const mongodb = require('mongodb');

// class Product {
//     constructor(title, price, description, imageUrl, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         if (this._id) {
//             // update product
//             dbOp = db.collection('products').updateOne({
//                 _id: this._id
//             }, {
//                 $set: this
//             });

//         } else {
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return dbOp.then(product => {
//             console.log(product);
//             return product;
//         }).catch(err => {
//             console.log(err);
//         });

//     }
//     static fetchAll() {
//         const db = getDb();
//         return db
//             .collection('products')
//             .find()
//             .toArray()
//             .then(products => {
//                 console.log(products);
//                 return products;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
//     static findById(prodId) {
//         const db = getDb();
//         return db
//             .collection('products')
//             .find({ _id: new mongodb.ObjectId(prodId) })
//             .next()
//             .then(product => {
//                 console.log(product);
//                 return product;
//             }).catch(err => console.log(err));
//         /*  const updatedProducets = products.filter(prod => prod.id !== id);
//          fs.writeFile(p, JSON.stringify(updatedProducets), err => {
//              console.log(err);
//          }); */

//         /*    fs.writeFile(p, JSON.stringify(updatedProducets), err => {
//                if (!err) {
//                    cart.deleteProduct(id, _product.price);
//                }
//            }); */
//     }
//     static deleteById(prodId) {
//         const db = getDb();
//         return db
//             .collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
//             .then(result => {
//                 console.log('Deleted');
//             })
//             .catch(err => console.log(err));
//     }
// }

// module.exports = Product;