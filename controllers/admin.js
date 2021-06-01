const Product = require("../models/product");
const Order = require("../models/orders");
// const mongodb = require('mongodb');
// const ObjectId = mongodb.ObjectId;

exports.getAddProducts = (req, res, next) => {
  /*   if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  } */
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user._id,
  });
  // products.push({ title: req.body.title });
  product
    .save()
    .then((res) => {
      console.log("created product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  Product.findById(productId).then((product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      product: product,

    });
  });
};

exports.postEditProducts = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedProductTitle = req.body.title;
  const updatedProductImageUrl = req.body.imageUrl;
  const updatedProductPrice = req.body.price;
  const updatedProductDescription = req.body.description;
  // mongo db
  // const updatedProduct = new Product(
  //   updatedProductTitle,
  //   updatedProductPrice,
  //   updatedProductDescription,
  //   updatedProductImageUrl,
  //   prodId
  // );
  // updatedProduct
  //   .save()
  //   .then(() => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));

  // mongoose
  Product.findById(prodId)
    .then((product) => {
      product.title = updatedProductTitle;
      product.price = updatedProductPrice;
      product.description = updatedProductDescription;
      product.imageUrl = updatedProductImageUrl;
      return product.save();
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    /*  .select("title price -_id")
    .populate("userId", "name") */
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
  
      });
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  // Product.deleteById(productId)
  Product.findByIdAndRemove(productId)
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
