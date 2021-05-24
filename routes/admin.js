var express = require('express');
// const { response } = require('../../database/app');
var router = express.Router();
// var files=require("express-fileupload")
var producthelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {

  producthelper.getAllproducts().then((products)=>{

      res.render('admin/view-products',{admin:true,products});


  })


});

router.get('/add-product',(request,response)=>{

    response.render("admin/addproduct",{admin:true})
})

router.post('/add-product',(request,response)=>{
    console.log(request.body) 

    if(request.files.img==null)
    {
      console.log("error")
    }
    else
    {
    console.log(request.files.img)
    }
    // console.log(request.files.img)
    producthelper.addProduct(request.body,(id)=>{

      let image=request.files.img
      image.mv('./public/images/product-images/'+id+'.jpg',(err,done)=>{
        if(!err)
        {
          
          response.render('admin/addproduct',{admin:true})

        }
        else
        {
          console.log(err)
        }
      })

    })
})

module.exports = router;
