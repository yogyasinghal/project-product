const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    description :{
        type:String,
        required:true
    },
    model:{
        type:Number,
        required:true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    stock:{
        type:Boolean,
        required:true
    },
    delivery:{
        type:Number,
        required:true
    }
})
const Product = new mongoose.model("Product",productSchema);
module.exports = Product;