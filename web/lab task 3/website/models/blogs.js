var mongoose = require("mongoose")
var BlogsSchema = mongoose.Schema({
    title:String,
    blog:String
    
})


const Blog = mongoose.model("blogs",BlogsSchema)
module.exports = Blog;