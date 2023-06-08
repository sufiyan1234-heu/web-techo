var mongoose = require("mongoose")
var userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
    
})


const User = mongoose.model("users",userSchema)
module.exports = User;
