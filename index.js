const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

//connect to MongoDb

mongoose.connect( 
    'mongodb://mongo:27017/docker-node-mongo',
      { useNewUrlParser: true }
      )
      .then(()=> console.log("MongoDB Connected"))
      .catch(err => console.log(err));

 const Product = require('./models/product.ejs');

app.get('/', (req,res )=>{
     Product.find()
    .then(products => res.render('index', { products }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
       });

app.post('/product/add',(req,res)=>{
  const newProduct = new Product({
   name: req.body.name,
   description: req.body.description,
   price: req.body.price,
    
    });
       newProduct.save().then(product => res.redirect('/'));
});


 const port = 3000;

 app.listen(port, () => console.log('Server running......'))


