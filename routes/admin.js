var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

const productHelpers=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
   
    res.render('admin/view-products',{admin:true,products})
  })
  
});
router.get('/add-product',function(req,res,next){
  res.render('admin/add-product')
});

router.post('/add-product',function(req,res){
  
  productHelper.addProduct(req.body,(id)=>{
      console.log(id)
      let image=req.files.Image
      image.mv('./public/images/'+id+'.jpg',(err,done)=>{
        if(!err){
          res.render('admin/add-product')
        }else{
          console.log("error")
        }
      })
      
    })
   
  })

  router.get('/delete-product/',(req,res)=>{
    let prodId=req.query.id
    console.log(prodId)
    productHelper.deleteProduct(prodId).then((response)=>{
      res.redirect('/admin/')
    })
  })
  router.get('/edit-product/:id',async(req,res)=>{
    let product=await productHelper.getProductDetails(req.params.id)
    console.log(product)
    res.render('admin/edit-product',{product})
  })
  router.post('/edit-product/:id',(req,res)=>{
    let id=req.params.id
    productHelper.updateProduct(req.params.id,req.body).then((response)=>{
      res.redirect('/admin/')
      if(req.files.Image){
        let image=req.files.Image
        image.mv('./public/images/'+id+'.jpg')
      }
    })
  })

module.exports = router;
