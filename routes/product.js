var express = require('express');
var router = express.Router();
const Product = require('../models/product');

// finding specific product with code
router.get('/:code',(req,res)=>{
  Product.find({code:req.params.code})
  .exec()
  .then((data)=>{
    if (data.length != 0){
      console.log("data = ",data);
      res.send(data);
    }
    else{
      res.send("product not found")
    }
  })
  .catch((err)=>{
    console.log("err = ",err);
    res.send("error");
  })
})

// fetching all products
router.get('/', function(req, res, next) {

  Product.find()
  .exec()
  .then((data)=>{
    console.log("data = ",data);
    res.send(data);
  })
  .catch((err)=>{
    console.log("err = ",err);
    res.send("error");
  })
  // res.send('respond with a resource');
});


// adding a product
router.post('/', function(req, res, next) {
  console.log("req.body = ",req.body);
  Product.find({code:req.body.code})
  .exec()
  .then((data)=>{
    if (data.length == 0){
      // const { name, price, code, description, model, stock,delivery } = req.body;
      // const newProduct = new Product({
      //   name, 
      //   price, 
      //   code, 
      //   description, 
      //   model, 
      //   stock,
      //   delivery
      // })

      // short way of saving data
      const newProduct = new Product(
        req.body
      )
      newProduct.save()
      .then((result)=>{
        // console.log("result = ",result);
        res.send("product saved successfully");
      })
      .catch((err)=>{
        console.log("err = ",err);
        res.send("error in saving product");
      })
    }
    else{
      console.log("product is already present");
      res.send("product is already present");
    }

    console.log("data from post = ",data);
    
  })
  .catch((err)=>{
    console.log("err from post = ",err);
    res.send("error");
  })
    // res.send('respond with a resource');
}); 


  

module.exports = router;
