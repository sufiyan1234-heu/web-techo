var mongoose = require("mongoose")
var productSchema = mongoose.Schema({
    title:String,
    slug:String,
    attraction:String
    
})


const Product = mongoose.model("products",productSchema)
module.exports = Product;

