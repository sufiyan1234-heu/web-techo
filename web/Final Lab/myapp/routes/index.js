var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index");
});

router.get('/cart', function(req, res, next) {
  let cart = req.cookies.cart;
  if(!cart) cart = [];
  res.render("cart", {cart});
  // res.render("cart" , {title:"My shoping cart"});
});



module.exports = router;
