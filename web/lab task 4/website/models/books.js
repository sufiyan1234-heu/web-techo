var mongoose = require("mongoose")
var BookSchema = mongoose.Schema({
    title:String,
    price:String,
    image:String
    
})


const Book = mongoose.model("books",BookSchema)
module.exports = Book;