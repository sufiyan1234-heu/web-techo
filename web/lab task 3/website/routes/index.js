var express = require('express');
var router = express.Router();
var Book = require("../models/books");
var Blog = require("../models/blogs");
const multer = require("multer");
const admin = require("firebase-admin");
var checkSessionAuth = require('../middlewares/checkSessionAuth')
const serviceAccount = require("../bookstorekey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "bookstore-e0b2c.appspot.com",
});

const bucket = admin.storage().bucket();
const upload = multer({ storage: multer.memoryStorage() });
/* GET home page. */
router.get('/', async function(req, res, next) {
  // res.render('index' , {});
  let books = await Book.find();
  console.log(books)
  res.render('index' , {books})
});

router.get('/blogs',async function(req, res, next) {
 
  let blogs = await Blog.find();
  console.log(blogs)
  res.render('blogs' ,{title:"Blogs",blogs})
});

router.get('/blogadd',async function(req, res, next) {
 
  res.render("addblog")
});

router.post('/blogadd', async function (req, res, next) {
  let blogs = new Blog(req.body)
  await blogs.save()
  res.redirect("/blogs")
});

router.get('/books', async function(req, res, next) {

  let books = await Book.find();
  console.log(books)
  res.render('list' , {title:"Featured Books",books})
});

router.get('/add',checkSessionAuth, async function (req, res, next) {
  res.render("add")
});

router.post("/add", upload.single("image"), async (req, res) => {
  const { title, price } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  const filename = Date.now() + "_" + file.originalname;
  const filepath = `books/${filename}`;

  const bucketFile = bucket.file(filepath);

  const stream = bucketFile.createWriteStream({
    resumable: false,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: Date.now(),
      },
    },
  });

  stream.on("finish", async () => {
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(filepath)}?alt=media&token=${
      bucketFile.metadata.metadata.firebaseStorageDownloadTokens
    }`;

    const book = new Book({
      title: title,
      price: price,
      image: imageUrl,
    });

    try {
      const savedBook = await book.save();
      res.redirect("/books"); // or any other desired route
    } catch (error) {
      console.error("Error saving book:", error);
      res.status(500).send("Error saving book");
    }
  });

  stream.end(file.buffer);
});

router.get('/cart',checkSessionAuth, function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = []
  res.render("cart", { cart })
});

// router.post('/add', async function (req, res, next) {
//   let book = new Book(req.body)
//   await book.save()
//   res.redirect("/books")
// });



router.get('/cart/:id',checkSessionAuth, async function (req, res, next) {
  let book = await Book.findById(req.params.id);
  let cart = []
  if (req.cookies.cart) cart = req.cookies.cart
  cart.push(book)
  res.cookie("cart", cart)
  console.log("Add this product in cart")
  res.redirect("/books")
});

router.get('/cart/remove/:id',checkSessionAuth, async function (req, res, next) {
  let cart = []
  if (req.cookies.cart) cart = req.cookies.cart
  cart.splice(cart.findIndex((c) => (c._id == req.params.id)), 1)
  res.cookie("cart", cart)
  console.log("Add this product in cart")
  res.redirect("/cart")
});


router.get('/edit/:id',checkSessionAuth, async function (req, res, next) {
  let book = await Book.findById(req.params.id);
  res.render("update", { book })
});
router.post('/edit/:id', async function (req, res, next) {
  let book = await Book.findById(req.params.id);
  book.name = req.body.title;
  book.price = req.body.price;
  // book.image = req.body.image
  await book.save()
  res.redirect("/books")
});

router.get('/delete/:id',checkSessionAuth, async function (req, res, next) {
  let book = await Book.findByIdAndDelete(req.params.id);
  res.redirect("/books")
});

router.get('/blogs/delete/:id',checkSessionAuth, async function (req, res, next) {
  let blogs = await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/blogs")
});

router.get('/blogs/edit/:id',checkSessionAuth, async function (req, res, next) {
  let blog = await Blog.findById(req.params.id);
  res.render("updateblog", { blog })
});

router.post('/blogs/edit/:id', async function (req, res, next) {
  let blog = await Blog.findById(req.params.id);
  blog.title = req.body.title;
  blog.blog = req.body.blog;
  
  await blog.save()
  res.redirect("/blogs")
});

module.exports = router;
