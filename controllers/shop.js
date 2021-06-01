const Product = require("../models/product");
const User = require("../models/users");
const Order = require("../models/orders");

exports.getProducts = (req, res, next) => {
  // console.log('in another middleware' + path.join(__dirname));
  // const products = adminData.products;
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  Product.find()
    .then((products) => {
      // const isLoggedin = req.get("Cookie").trim().split("=")[1];
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
        
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findById(prodId)
  Product.findById(prodId)
    .then((product) => {
      console.log("success");
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
   
    });
  });
};

exports.getCart = (req, res, next) => {
  // req.user
  //     .getCart()
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items;
      console.log(products);
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log("cart added" + result);
      res.redirect("/cart");
      isAuthenticated: req.session.isLoggedIn;
    })
    .catch((err) => console.log(err));
  // res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return {
          quantity: i.quantity,
          product: { ...i.productId._doc },
        };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then(() => {
      req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));

  /*   req.user
    .createOrder()
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err)); */
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id }).then((orders) => {
    console.log("order" + orders);
    res.render("shop/orders", {
      pageTitle: "Your Orders",
      path: "/orders",
      orders: orders,
      
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
