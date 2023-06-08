var express = require('express');
var router = express.Router();
var Product = require("../models/products");



/* GET home page. */
router.get('/api/products', async function(req, res, next) {

  let products = await Product.find();
  res.json(products);
  console.log(products)
});
router.post('/api/add', async function(req, res, next) {
  let product = new Product(req.body);
  await product.save()
  console.log(products)
  res.json(products);
});
router.get('api/delete/:id', async function(req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id)
  console.log(product)
  res.json(product);
});
router.get('api/edit/:id', async function(req, res, next) {
  let product = await Product.findById(req.params.id)
});
router.put('api/edit/:id', async function(req, res, next) {
  let product = await Product.findById(req.params.id)
  product.title = req.body.title
  product.slug = req.body.slug
  product.attraction = req.body.attraction
  await product.save()
  console.log(product)
  res.json(product);
});
module.exports = router;
